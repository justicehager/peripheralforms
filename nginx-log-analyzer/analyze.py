#!/usr/bin/env python3
"""
Nginx Log Analyzer with ASCII Art Visualization
Analyzes nginx access logs and displays traffic statistics with ASCII art.
"""

import re
import sys
from collections import Counter, defaultdict
from datetime import datetime
from typing import Dict, List, Tuple
import argparse


class NginxLogAnalyzer:
    """Analyzes nginx access logs and generates ASCII art visualizations."""

    # Nginx combined log format regex
    LOG_PATTERN = re.compile(
        r'(?P<ip>[\d\.]+) - (?P<user>\S+) \[(?P<time>[^\]]+)\] '
        r'"(?P<method>\S+) (?P<path>\S+) (?P<protocol>[^"]+)" '
        r'(?P<status>\d+) (?P<size>\d+|-) "(?P<referrer>[^"]*)" "(?P<user_agent>[^"]*)"'
    )

    def __init__(self, log_file: str):
        self.log_file = log_file
        self.entries = []
        self.total_requests = 0
        self.status_codes = Counter()
        self.ip_addresses = Counter()
        self.paths = Counter()
        self.methods = Counter()
        self.hourly_traffic = defaultdict(int)
        self.sizes = []
        self.not_found_paths = Counter()  # Track 404 error paths
        self.min_date = None  # Track earliest log entry
        self.max_date = None  # Track latest log entry

    def parse_logs(self):
        """Parse the nginx log file."""
        try:
            with open(self.log_file, 'r') as f:
                for line in f:
                    match = self.LOG_PATTERN.match(line.strip())
                    if match:
                        entry = match.groupdict()
                        self.entries.append(entry)
                        self.total_requests += 1

                        # Collect statistics
                        self.status_codes[entry['status']] += 1
                        self.ip_addresses[entry['ip']] += 1
                        self.paths[entry['path']] += 1
                        self.methods[entry['method']] += 1

                        # Track 404 errors specifically
                        if entry['status'] == '404':
                            self.not_found_paths[entry['path']] += 1

                        # Parse timestamp for hourly traffic and date range
                        try:
                            dt = datetime.strptime(entry['time'], '%d/%b/%Y:%H:%M:%S %z')
                            hour = dt.hour
                            self.hourly_traffic[hour] += 1

                            # Track min/max dates
                            if self.min_date is None or dt < self.min_date:
                                self.min_date = dt
                            if self.max_date is None or dt > self.max_date:
                                self.max_date = dt
                        except:
                            pass

                        # Collect sizes
                        size = entry['size']
                        if size != '-':
                            self.sizes.append(int(size))

        except FileNotFoundError:
            print(f"Error: Log file '{self.log_file}' not found.")
            sys.exit(1)
        except Exception as e:
            print(f"Error parsing log file: {e}")
            sys.exit(1)

    def render_header(self):
        """Render ASCII art header."""
        header = r"""
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║   ███╗   ██╗ ██████╗ ██╗███╗   ██╗██╗  ██╗                          ║
║   ████╗  ██║██╔════╝ ██║████╗  ██║╚██╗██╔╝                          ║
║   ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║ ╚███╔╝                           ║
║   ██║╚██╗██║██║   ██║██║██║╚██╗██║ ██╔██╗                           ║
║   ██║ ╚████║╚██████╔╝██║██║ ╚████║██╔╝ ██╗                          ║
║   ╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝                          ║
║                                                                       ║
║             L O G   A N A L Y Z E R   v1.0                           ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
"""
        print(header)

    def render_overview(self):
        """Render overview statistics."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print("│                        TRAFFIC OVERVIEW                             │")
        print("├─────────────────────────────────────────────────────────────────────┤")
        print(f"│  Total Requests:     {self.total_requests:>10,}                              │")

        # Display date range if available
        if self.min_date and self.max_date:
            date_format = '%Y-%m-%d %H:%M:%S %Z'
            min_str = self.min_date.strftime(date_format)
            max_str = self.max_date.strftime(date_format)
            duration = self.max_date - self.min_date

            print("├─────────────────────────────────────────────────────────────────────┤")
            print("│  Date Range:                                                        │")
            print(f"│    From: {min_str:<56}│")
            print(f"│    To:   {max_str:<56}│")

            # Calculate and display duration
            days = duration.days
            hours = duration.seconds // 3600
            minutes = (duration.seconds % 3600) // 60
            if days > 0:
                duration_str = f"{days}d {hours}h {minutes}m"
            elif hours > 0:
                duration_str = f"{hours}h {minutes}m"
            else:
                duration_str = f"{minutes}m"
            print(f"│    Duration: {duration_str:<55}│")

        print("├─────────────────────────────────────────────────────────────────────┤")
        print(f"│  Unique IPs:         {len(self.ip_addresses):>10,}                              │")
        print(f"│  Unique Paths:       {len(self.paths):>10,}                              │")

        if self.sizes:
            avg_size = sum(self.sizes) / len(self.sizes)
            total_size = sum(self.sizes)
            print(f"│  Avg Response Size:  {self._format_bytes(avg_size):>10}                              │")
            print(f"│  Total Data Sent:    {self._format_bytes(total_size):>10}                              │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_status_codes(self):
        """Render status code distribution with ASCII bars."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print("│                     STATUS CODE DISTRIBUTION                        │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.status_codes:
            print("│  No status codes found                                              │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        max_count = max(self.status_codes.values())
        bar_width = 50

        for status, count in sorted(self.status_codes.items()):
            percentage = (count / self.total_requests) * 100
            bar_length = int((count / max_count) * bar_width)
            bar = '█' * bar_length
            status_label = self._get_status_label(status)

            print(f"│  {status} {status_label:<12} │ {bar:<50} │ {count:>6} ({percentage:>5.1f}%) │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_top_ips(self, limit=10):
        """Render top IP addresses."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print(f"│                       TOP {limit} IP ADDRESSES                            │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.ip_addresses:
            print("│  No IP addresses found                                              │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        for i, (ip, count) in enumerate(self.ip_addresses.most_common(limit), 1):
            percentage = (count / self.total_requests) * 100
            print(f"│  {i:>2}. {ip:<15} │ {count:>8} requests ({percentage:>5.1f}%)            │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_top_paths(self, limit=10):
        """Render top requested paths."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print(f"│                      TOP {limit} REQUESTED PATHS                          │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.paths:
            print("│  No paths found                                                     │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        for i, (path, count) in enumerate(self.paths.most_common(limit), 1):
            percentage = (count / self.total_requests) * 100
            path_display = path[:40] + '...' if len(path) > 40 else path
            print(f"│  {i:>2}. {path_display:<43} │ {count:>6} ({percentage:>4.1f}%) │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_404_errors(self, limit=10):
        """Render paths generating 404 errors."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print(f"│                    PATHS GENERATING 404 ERRORS                      │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.not_found_paths:
            print("│  No 404 errors found - Great!                                       │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        total_404s = sum(self.not_found_paths.values())
        print(f"│  Total 404 Errors: {total_404s:>6}                                           │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        for i, (path, count) in enumerate(self.not_found_paths.most_common(limit), 1):
            percentage = (count / total_404s) * 100
            path_display = path[:43] + '...' if len(path) > 43 else path
            print(f"│  {i:>2}. {path_display:<43} │ {count:>6} ({percentage:>4.1f}%) │")

        if len(self.not_found_paths) > limit:
            remaining = len(self.not_found_paths) - limit
            print(f"│  ... and {remaining} more unique 404 paths                                 │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_hourly_traffic(self):
        """Render hourly traffic distribution."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print("│                    HOURLY TRAFFIC DISTRIBUTION                      │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.hourly_traffic:
            print("│  No hourly data available                                           │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        max_hour_count = max(self.hourly_traffic.values()) if self.hourly_traffic else 1
        bar_width = 40

        for hour in range(24):
            count = self.hourly_traffic.get(hour, 0)
            if max_hour_count > 0:
                bar_length = int((count / max_hour_count) * bar_width)
            else:
                bar_length = 0
            bar = '▓' * bar_length
            print(f"│  {hour:>2}:00 │ {bar:<40} │ {count:>6} │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_http_methods(self):
        """Render HTTP method distribution."""
        print("\n┌─────────────────────────────────────────────────────────────────────┐")
        print("│                      HTTP METHOD DISTRIBUTION                       │")
        print("├─────────────────────────────────────────────────────────────────────┤")

        if not self.methods:
            print("│  No HTTP methods found                                              │")
            print("└─────────────────────────────────────────────────────────────────────┘")
            return

        max_count = max(self.methods.values())
        bar_width = 45

        for method, count in sorted(self.methods.items(), key=lambda x: x[1], reverse=True):
            percentage = (count / self.total_requests) * 100
            bar_length = int((count / max_count) * bar_width)
            bar = '█' * bar_length
            print(f"│  {method:<7} │ {bar:<45} │ {count:>6} ({percentage:>4.1f}%) │")

        print("└─────────────────────────────────────────────────────────────────────┘")

    def render_footer(self):
        """Render ASCII art footer."""
        print("\n")
        print("╔═══════════════════════════════════════════════════════════════════════╗")
        print("║                     Analysis Complete! ✓                              ║")
        print("╚═══════════════════════════════════════════════════════════════════════╝")
        print()

    @staticmethod
    def _get_status_label(status: str) -> str:
        """Get human-readable label for HTTP status code."""
        labels = {
            '200': 'OK',
            '201': 'Created',
            '204': 'No Content',
            '301': 'Moved',
            '302': 'Redirect',
            '304': 'Not Modified',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '500': 'Server Error',
            '502': 'Bad Gateway',
            '503': 'Unavailable',
        }
        return labels.get(status, 'Unknown')

    @staticmethod
    def _format_bytes(bytes_value: float) -> str:
        """Format bytes into human-readable format."""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if bytes_value < 1024.0:
                return f"{bytes_value:.1f} {unit}"
            bytes_value /= 1024.0
        return f"{bytes_value:.1f} PB"

    def analyze(self, top_ips=10, top_paths=10):
        """Run full analysis and render all visualizations."""
        self.render_header()
        self.parse_logs()

        if self.total_requests == 0:
            print("\n⚠ No valid log entries found in the file.\n")
            sys.exit(1)

        self.render_overview()
        self.render_status_codes()
        self.render_http_methods()
        self.render_top_ips(top_ips)
        self.render_top_paths(top_paths)
        self.render_404_errors(top_paths)  # Show 404 errors
        self.render_hourly_traffic()
        self.render_footer()


def main():
    parser = argparse.ArgumentParser(
        description='Analyze nginx access logs and display ASCII art visualizations',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s /var/log/nginx/access.log
  %(prog)s access.log --top-ips 20
  %(prog)s access.log --top-paths 15
        """
    )

    parser.add_argument('log_file', help='Path to nginx access log file')
    parser.add_argument('--top-ips', type=int, default=10,
                        help='Number of top IPs to display (default: 10)')
    parser.add_argument('--top-paths', type=int, default=10,
                        help='Number of top paths to display (default: 10)')

    args = parser.parse_args()

    analyzer = NginxLogAnalyzer(args.log_file)
    analyzer.analyze(top_ips=args.top_ips, top_paths=args.top_paths)


if __name__ == '__main__':
    main()
