# Nginx Log Analyzer with ASCII Art

A command-line tool that analyzes nginx access logs and visualizes traffic statistics using beautiful ASCII art.

## Features

🎨 **ASCII Art Visualizations**
- Beautiful header and footer graphics
- Bar charts for status codes, HTTP methods, and hourly traffic
- Clean, monospace-friendly output

📊 **Traffic Analysis**
- Total requests and unique visitors
- Status code distribution
- Top IP addresses
- Most requested paths
- HTTP method distribution
- Hourly traffic patterns
- Response size statistics

## Requirements

- Python 3.6 or higher
- No external dependencies (uses only Python standard library)

## Installation

1. Make the script executable:
```bash
chmod +x analyze.py
```

2. (Optional) Create a symlink for easier access:
```bash
sudo ln -s /path/to/analyze.py /usr/local/bin/nginx-analyze
```

## Usage

### Basic Usage

```bash
./analyze.py /var/log/nginx/access.log
```

### Command-Line Options

```bash
./analyze.py [OPTIONS] <log_file>

Arguments:
  log_file              Path to nginx access log file

Options:
  --top-ips N          Number of top IPs to display (default: 10)
  --top-paths N        Number of top paths to display (default: 10)
  -h, --help           Show help message
```

### Examples

Analyze a log file with default settings:
```bash
./analyze.py /var/log/nginx/access.log
```

Show top 20 IP addresses:
```bash
./analyze.py access.log --top-ips 20
```

Show top 15 requested paths:
```bash
./analyze.py access.log --top-paths 15
```

Analyze and save output to file:
```bash
./analyze.py /var/log/nginx/access.log > report.txt
```

## Output Example

```
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

┌─────────────────────────────────────────────────────────────────────┐
│                        TRAFFIC OVERVIEW                             │
├─────────────────────────────────────────────────────────────────────┤
│  Total Requests:         15,234                                     │
│  Unique IPs:              1,523                                     │
│  Unique Paths:              342                                     │
│  Avg Response Size:    45.2 KB                                      │
│  Total Data Sent:     689.1 MB                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     STATUS CODE DISTRIBUTION                        │
├─────────────────────────────────────────────────────────────────────┤
│  200 OK          │ ██████████████████████████████████████  │  12456 ( 81.8%) │
│  304 Not Modified│ █████                                   │    892 (  5.9%) │
│  404 Not Found   │ ███                                     │    567 (  3.7%) │
│  500 Server Error│ ██                                      │    234 (  1.5%) │
└─────────────────────────────────────────────────────────────────────┘
```

## Log Format Support

This tool supports the nginx **combined log format**:

```
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';
```

Example log line:
```
192.168.1.1 - - [22/Nov/2025:10:30:45 +0000] "GET /index.html HTTP/1.1" 200 1234 "https://example.com" "Mozilla/5.0"
```

## Visualizations Included

1. **Traffic Overview** - Summary statistics with total requests, unique IPs, paths, and data transfer
2. **Status Code Distribution** - Bar chart showing HTTP status codes (200, 404, 500, etc.)
3. **HTTP Method Distribution** - Breakdown of GET, POST, PUT, DELETE, etc.
4. **Top IP Addresses** - Most active visitors
5. **Top Requested Paths** - Most popular URLs
6. **Hourly Traffic** - 24-hour distribution showing peak traffic times

## Tips

- **Large log files**: The tool can handle large log files, but parsing may take time. Consider analyzing recent logs or using log rotation.
- **Real-time monitoring**: Combine with `tail -f` for live updates:
  ```bash
  tail -f /var/log/nginx/access.log | grep "pattern" > temp.log && ./analyze.py temp.log
  ```
- **Terminal width**: For best results, use a terminal width of at least 80 characters.
- **Color output**: The tool uses Unicode box-drawing characters. Ensure your terminal supports UTF-8.

## Testing

A sample log file is provided for testing:

```bash
./analyze.py sample_access.log
```

## Troubleshooting

**"No valid log entries found"**
- Check that your log file uses the nginx combined format
- Verify the log file path is correct
- Ensure the log file is not empty

**Unicode characters not displaying correctly**
- Ensure your terminal supports UTF-8 encoding
- Try setting: `export LANG=en_US.UTF-8`

**Permission denied**
- Make the script executable: `chmod +x analyze.py`
- For system log files, you may need sudo: `sudo ./analyze.py /var/log/nginx/access.log`

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

MIT License - Feel free to use and modify as needed.

## Author

Created for the Peripheral Forms project.
