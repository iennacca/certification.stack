# Certification/Stack

A comprehensive case study exploring different AI-powered development approaches: from vibe-coded solutions to no-code platforms and spec-driven development.

## Overview

This project demonstrates multiple approaches to solving a common problem: managing and processing large amounts of content (videos, PDFs, links) with AI assistance. The solutions range from traditional code-based approaches to no-code orchestration and structured spec-driven development.

**Development Journey:** vibe-code → no-code → spec-driven development (SDD)

## Problem Statement

Managing copious amounts of links and notes from various sources (videos, PDFs, etc.) requires:
- a) Getting copies of original content (video, image, pdf, etc.)
- b) Running content through AI agents to summarize the content
- c) Studying effective ways of storing both original content and generated metadata

Additionally, for production applications (like insurance compliance), we need more testability and verifiability built around agent workflows.

## Solutions

### P1: Low-Code/No-Code Approach

#### v1: Multi Categorizer
- **Repository:** https://github.com/iennacca/test.multi.categorizer
- **Tech:** Python (vibe-coded)
- **Features:** Download videos using yt-dlp, transcribe with OpenAI Whisper API, generate summaries and tags

#### v2: VibeScribe
- **Repository:** https://github.com/iennacca/vibescribe
- **Tech:** Google AI Studio
- **Features:** Quick prototyping with minimal prompt engineering

#### v3: ChatGPT/n8n Categorizer
- **Tech:** n8n (no-code orchestration)
- **Motivation:** Keep data local to the process
- **Deployment:** Running n8n locally (local vs cloud hosted)
- **Features:** No-code orchestration layer with minimal coding

### P2: Multi-Agent Code

#### v4: Spec-Driven Development (Spec Kit)
- **Repository:** https://github.com/iennacca/test.sdd.carina
- **Tech:** F# and JavaScript
- **AI Tools:** ChatGPT 5.x and Claude Opus 4.x
- **Motivation:** 
  - Stress test context engineering
  - Use less popular languages (smaller knowledge surface area for LLMs)
  - Automate tedious tasks
- **Features:**
  - Constitution document (immutable guidelines)
  - Spec document (features and processes)
  - Plan document (technical requirements)
  - Tasks document (concrete implementation steps)
  - Automated code generation from specifications

#### v5: MCP server extension for OpenBrain
  - https://github.com/iennacca/os.openbrain
  - Extends the OpenBrain concept by creating an MCP server and making it callable on the Slack agent. The agent is then instructed to check on what MCP tools are available first before fulfilling the query request
  

## Project Structure

```
certification.stack/
├── n8n/                    # n8n workflow configurations
│   └── [WORK] Company Acquisition Due Diligence.json
├── oppos/                  # Opportunity documents
│   ├── aiconsultant.jfowler/
│   └── ragAgent.espana/
├── script/                 # Presentation and demo scripts
│   ├── capability.fintech.txt
│   ├── interview.certification.txt
│   └── script.txt
├── test/                   # Test files and examples
└── storyboard.demo.stack.md  # Main project storyboard
```

## Key Takeaways

- **Different tools for different scenarios:** Each approach has its place and purpose
- **No-code solutions (n8n, Replit):** Useful for rapid prototyping and private AI agents with limited audiences
- **SDD requires active vetting:** Automated code generation needs careful validation, though generated tests help
- **Language choice matters:** F# was chosen specifically as it's not in the top GitHub languages, testing LLM capabilities on less common codebases
- **Security considerations:** Exploring hyperlocal AI solutions (localized LLMs on zero-trust private clouds)

## Technologies Used

- **AI APIs:** OpenAI (Whisper, GPT), Google AI Studio (Gemini), Claude
- **Orchestration:** n8n, OpenRouter
- **Languages:** Python, F#, JavaScript
- **Tools:** yt-dlp, Notion API, Tailscale, Supabase
- **Development Approaches:** Vibe-coding, No-code, Spec-driven development

## Use Cases

- Content summarization and categorization
- Insurance compliance applications
- Knowledge management and second brain systems
- Private AI agent deployment
- Multi-agent workflow orchestration

## Getting Started

Each solution variant has its own repository and setup instructions. See the links above for specific implementations.

For the n8n workflows in this repository, you'll need:
1. n8n installed locally or access to a cloud instance
2. Required API keys (OpenAI, etc.)
3. Import the workflow JSON files from the `n8n/` directory

## Contributing

This is a demonstration/case study project. Feel free to explore the linked repositories for specific implementations.

## Notes

- The project demonstrates the evolution from quick prototypes to production-ready, testable applications
- Emphasis on both rapid development and code quality/verifiability
- Security-first approach for enterprise deployments

---

*SALAMAT PO. My small piece of resistance against Skynet.* 🤖
