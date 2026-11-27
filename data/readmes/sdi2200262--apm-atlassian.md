# apm-atlassian

A team customization of [APM](https://github.com/sdi2200262/agentic-project-management). Review the Spec and Plan in Confluence, then claim Stages in Jira. Hand off to another teammate between Stages and share APM session documents through Bitbucket.

Start APM from the root of the separate Bitbucket repository for APM files.

```text
workspace/
  my-project/       # Working repository
  my-project-apm/   # Bitbucket repository and APM session root
    .git/
    .apm/
    .agents/        # Or .claude/ for Claude Code
```

Set up [Atlassian MCP](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) in each assistant. Once a release is available, install the team's assistant targets in the session root.

```sh
apm custom -r sdi2200262/apm-atlassian
```
