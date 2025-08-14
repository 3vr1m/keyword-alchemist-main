const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  cleanJsonString(str) {
    // Remove control characters and non-printable characters
    let cleaned = str.replace(/[\x00-\x1F\x7F]/g, '');
    
    // Remove markdown code block markers if present
    cleaned = cleaned.replace(/```json\s*|\s*```/g, '');
    
    // Find the first { and last } to extract just the JSON object
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    return cleaned.trim();
  }

  async generateBlogPost(keyword, options = {}) {
    const {
      tone = 'professional',
      length = 'medium',
      includeIntro = true,
      includeConclusion = true,
      targetAudience = 'general'
    } = options;

    const lengthGuide = {
      'short': '300-500 words',
      'medium': '800-1200 words',
      'long': '1500-2000 words'
    };

    const prompt = `Create a comprehensive blog post about "${keyword}".

Requirements:
- Target audience: ${targetAudience}
- Tone: ${tone}
- Length: ${lengthGuide[length]}
- ${includeIntro ? 'Include an engaging introduction' : 'Skip introduction, start with main content'}
- ${includeConclusion ? 'Include a compelling conclusion' : 'End with main content, no formal conclusion'}
- Use proper markdown formatting with headers, bullet points, and emphasis
- Include actionable insights and practical information
- Ensure content is SEO-friendly and valuable to readers

Return the response as a JSON object with this exact structure:
{
  "title": "SEO-optimized blog post title",
  "content": "Full blog post content in markdown format",
  "wordCount": estimated_word_count_number,
  "tags": ["relevant", "keyword", "tags"],
  "metaDescription": "Brief SEO meta description under 160 characters"
}`;

    try {
      console.log(`Generating blog post for keyword: ${keyword}`);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      console.log('Raw AI response length:', text.length);
      
      // Clean the JSON string
      const cleanedText = this.cleanJsonString(text);
      console.log('Cleaned JSON length:', cleanedText.length);
      
      try {
        const blogPost = JSON.parse(cleanedText);
        
        // Validate required fields
        if (!blogPost.title || !blogPost.content) {
          throw new Error('Missing required fields in AI response');
        }
        
        // Calculate actual word count from content
        const actualWordCount = this.countWords(blogPost.content);
        blogPost.wordCount = actualWordCount;
        
        console.log(`Generated blog post: "${blogPost.title}" (${actualWordCount} words)`);
        return blogPost;
        
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError.message);
        console.error('Cleaned text that failed to parse:', cleanedText);
        throw new Error(`Failed to parse AI response: ${parseError.message}`);
      }
      
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw new Error(`Blog post generation failed: ${error.message}`);
    }
  }

  countWords(text) {
    // Remove markdown syntax for accurate word count
    const plainText = text
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
      .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list markers
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    // Count words (split by whitespace and filter out empty strings)
    return plainText.split(/\s+/).filter(word => word.length > 0).length;
  }

  async generateMultiplePosts(keywords, options = {}) {
    const results = [];
    
    for (const keyword of keywords) {
      try {
        const blogPost = await this.generateBlogPost(keyword, options);
        results.push({
          keyword,
          success: true,
          data: blogPost
        });
      } catch (error) {
        console.error(`Failed to generate post for "${keyword}":`, error.message);
        results.push({
          keyword,
          success: false,
          error: error.message
        });
      }
      
      // Add a small delay between requests to avoid rate limiting
      if (keywords.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

module.exports = GeminiService;
