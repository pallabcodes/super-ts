/**
 * Text Parsing Subsystem
 * Focus: Lexical analysis, pattern matching, tokenization.
 */

export class StreamPatternMatcher {
  static indexOf(text: string, pattern: string): number {
    if (!pattern) return 0;
    return text.indexOf(pattern);
  }
}
