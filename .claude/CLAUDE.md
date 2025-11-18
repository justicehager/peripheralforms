# Claude Configuration

## Session Initialization Protocol

**IMPORTANT**: At the start of each new chat session, you MUST perform the following steps:

### 1. Read Project Documentation

Always begin by reading the available project documentation in this order:

1. **README.md** - Read the project overview, setup instructions, and general information
2. **TODO.md** - Review current tasks, priorities, and project status
3. **docs/** directory - If it exists, scan for and read relevant documentation files

Use the following approach:

```
1. Read ./README.md to understand the project
2. Read ./TODO.md to understand current priorities and status
3. Check for ./docs/ directory and read relevant files
4. Look for any other .md files in the root that might be relevant
```

### 2. Understand Project Context

After reading the documentation:
- Understand the project's purpose and goals
- Know the current state and priorities from TODO.md
- Be aware of any known issues or blockers
- Understand the tech stack and architecture

### 3. Inform Your Responses

Use the documentation context to:
- Align all work with project goals
- Follow established patterns and conventions
- Respect current priorities
- Avoid suggesting already-completed work
- Build on existing functionality appropriately

## Documentation Discovery

If standard documentation files don't exist, look for:
- CONTRIBUTING.md
- ARCHITECTURE.md
- API.md
- Any .md files in the project root
- package.json or similar config files for context

## Example Session Start

```
Assistant: Let me start by reading the available project documentation...

[Reads README.md]
[Reads TODO.md]
[Checks for docs/ directory]

Based on the documentation, I understand this is a [project description].
The current priorities are [from TODO.md]. How can I help you today?
```

## Important Notes

- **Always read documentation first** - Even if you think you remember the project
- **Each session is fresh** - Treat every new chat as a new starting point
- **Stay current** - Documentation may have changed since last session
- **Be thorough** - Don't skip documentation reading to save time
