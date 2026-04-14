## title: 
	AI coding approaches: vibecode -> nocode -> sdd  

## problem: 
	This is an ongoing issue of mine where I have copious amounts of links and notes from different sources, mostly video links and PDFs. I needed a way to a) get copies of the original content (video, image, pdf, etc.), b) run content through an AI agent to summarize the content within the videos/pdfs and c) study ways of storing both original content and metadata generated. These use cases lended themselves well to vibe-coded or nocode solutions, as I'll highlight in the video.
  While I was doing this, however, I also started a proof of concept for an insurance compliance application where we needed more testability and verifiability built around the agent workflow. So we pivoted somewhat to use spec driven development as a hedge against a totally bespoke development initiative. For this, the end goal is to create applications with testable APIs with telemetry applied to facilitate human-in-the-loop checks against the agent's actions. 

## solution(s):
### P1: Low-code/no-code 
####	v1: multi.categorizer
  - https://github.com/iennacca/test.multi.categorizer
  - Python vibe-coded
  
#### v2: vibescribe
  - https://github.com/iennacca/vibescribe
  - Google AI Studio

#### v3: ChatGPT/n8n categorizer
  - no-code orchestration layer with minimal coding
  - motivation: need to get the data local to the process
  - running n8n locally (local vs cloud hosted)

### P2: Multi-agent code
#### v4: spec driven development / Spec Kit
  - https://github.com/iennacca/test.sdd.carina
  - mostly used ChatGPT 5.x and Claude Opus 4.x
  - running F# and JS
  - motivation: stress test context engineering 
  - use unpopular language (lesser knowledge surface area for LLMs to run on)
  - automate the boring / tedious tasks
  
#### v5: MCP server extension for OpenBrain
  - https://github.com/iennacca/os.openbrain
  - Extends the OpenBrain concept by creating an MCP server and making it callable on the Slack agent. The agent is then instructed to check on what MCP tools are available first before fulfilling the query request

takeaways:
 - As noted in video, different strokes for different folks - different tools for different scenarios.
 - I did some other POCs using Replit and n8n, which were useful in their own way. With wn8n specifically we created a workflow with n8n and Tailscale to create a private AI agent with a limited audience.
 - SDD in particular can get hairy quickly if you're not actively vetting the code. I still have to check if the modules created really were doing what I had specified in the use cases. Fortunately, the created tests themselves help in this regard.
 - I specifically used F# as its -not- one of the main languages in Github. I read somewhere that 6 main languages account for almost 80-90% of all code in the public repos, of which Python and Typescript were 1 and 2 - at this point I'm guessing there is a considerable number of repos that are AI generated or at least AI influenced.

#### - Our company is actively looking at hyperlocal AI solutions (think localized LLMs on zero trust private clouds). Would love to see how folks are dealing with security concerns, especially in light of OpenClaw, etc.

 thanks: 
 - SALAMAT PO. My small piece of resistance against Skynet. 
