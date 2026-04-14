/**
 * Converts Markdown text to Notion blocks format
 * Supports: headings, paragraphs, lists, code blocks, inline formatting
 */

class MarkdownToNotion {
  constructor() {
    this.blocks = [];
  }

  /**
   * Parse inline formatting (bold, italic, code, links)
   */
  parseInlineFormat(text) {
    const richText = [];
    let current = '';
    let i = 0;

    while (i < text.length) {
      // Bold (**text** or __text__)
      if ((text[i] === '*' && text[i + 1] === '*') || 
          (text[i] === '_' && text[i + 1] === '_')) {
        if (current) {
          richText.push({ type: 'text', text: { content: current } });
          current = '';
        }
        const delimiter = text[i] === '*' ? '**' : '__';
        i += 2;
        let boldText = '';
        while (i < text.length && !(text[i] === delimiter[0] && text[i + 1] === delimiter[1])) {
          boldText += text[i++];
        }
        if (i < text.length) {
          richText.push({
            type: 'text',
            text: { content: boldText },
            annotations: { bold: true }
          });
          i += 2;
        }
      }
      // Italic (*text* or _text_)
      else if (text[i] === '*' || text[i] === '_') {
        if (current) {
          richText.push({ type: 'text', text: { content: current } });
          current = '';
        }
        const delimiter = text[i];
        i++;
        let italicText = '';
        while (i < text.length && text[i] !== delimiter) {
          italicText += text[i++];
        }
        if (i < text.length) {
          richText.push({
            type: 'text',
            text: { content: italicText },
            annotations: { italic: true }
          });
          i++;
        }
      }
      // Inline code (`code`)
      else if (text[i] === '`') {
        if (current) {
          richText.push({ type: 'text', text: { content: current } });
          current = '';
        }
        i++;
        let codeText = '';
        while (i < text.length && text[i] !== '`') {
          codeText += text[i++];
        }
        if (i < text.length) {
          richText.push({
            type: 'text',
            text: { content: codeText },
            annotations: { code: true }
          });
          i++;
        }
      }
      // Links [text](url)
      else if (text[i] === '[') {
        if (current) {
          richText.push({ type: 'text', text: { content: current } });
          current = '';
        }
        i++;
        let linkText = '';
        while (i < text.length && text[i] !== ']') {
          linkText += text[i++];
        }
        if (i < text.length && text[i + 1] === '(') {
          i += 2;
          let url = '';
          while (i < text.length && text[i] !== ')') {
            url += text[i++];
          }
          richText.push({
            type: 'text',
            text: { content: linkText, link: { url } }
          });
          i++;
        }
      }
      else {
        current += text[i++];
      }
    }

    if (current) {
      richText.push({ type: 'text', text: { content: current } });
    }

    return richText.length > 0 ? richText : [{ type: 'text', text: { content: text } }];
  }

  /**
   * Convert markdown to Notion blocks
   */
  convert(markdown) {
    this.blocks = [];
    const lines = markdown.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) {
        i++;
        continue;
      }

      // Headings
      if (trimmed.startsWith('#')) {
        const match = trimmed.match(/^(#{1,3})\s+(.+)/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          this.blocks.push({
            object: 'block',
            type: `heading_${level}`,
            [`heading_${level}`]: {
              rich_text: this.parseInlineFormat(text)
            }
          });
        }
        i++;
      }
      // Code blocks (```language)
      else if (trimmed.startsWith('```')) {
        const language = trimmed.substring(3).trim() || 'plain text';
        i++;
        let codeContent = [];
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeContent.push(lines[i]);
          i++;
        }
        this.blocks.push({
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{
              type: 'text',
              text: { content: codeContent.join('\n') }
            }],
            language: language
          }
        });
        i++;
      }
      // Unordered list
      else if (trimmed.match(/^[-*+]\s+/)) {
        const text = trimmed.replace(/^[-*+]\s+/, '');
        this.blocks.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: this.parseInlineFormat(text)
          }
        });
        i++;
      }
      // Ordered list
      else if (trimmed.match(/^\d+\.\s+/)) {
        const text = trimmed.replace(/^\d+\.\s+/, '');
        this.blocks.push({
          object: 'block',
          type: 'numbered_list_item',
          numbered_list_item: {
            rich_text: this.parseInlineFormat(text)
          }
        });
        i++;
      }
      // Quote
      else if (trimmed.startsWith('>')) {
        const text = trimmed.replace(/^>\s*/, '');
        this.blocks.push({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: this.parseInlineFormat(text)
          }
        });
        i++;
      }
      // Divider
      else if (trimmed.match(/^(---|\*\*\*|___)$/)) {
        this.blocks.push({
          object: 'block',
          type: 'divider',
          divider: {}
        });
        i++;
      }
      // Paragraph (default)
      else {
        this.blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: this.parseInlineFormat(trimmed)
          }
        });
        i++;
      }
    }

    return this.blocks;
  }
}

// Usage example
const converter = new MarkdownToNotion();

const sampleMarkdown = `# Main Title

This is a **bold** paragraph with *italic* text and \`inline code\`.

## Subheading

Here's a [link](https://example.com) to a website.

- Bullet point 1
- Bullet point 2
- Bullet point 3

1. First item
2. Second item
3. Third item

> This is a quote

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

---

That's all!`;

// Convert markdown to Notion blocks
const notionBlocks = converter.convert(sampleMarkdown);

// Output the result
console.log(JSON.stringify(notionBlocks, null, 2));