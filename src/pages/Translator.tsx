import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Play, RotateCcw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Translator = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
  ];

  const handleTranslate = async () => {
    if (!sourceCode.trim() || !sourceLang || !targetLang) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before translating.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('translate-code', {
        body: {
          sourceLang,
          targetLang,
          code: sourceCode,
        },
      });

      if (error) {
        console.error('Translation error:', error);
        toast({
          title: "Translation Failed",
          description: error.message || "Failed to translate code. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setTranslatedCode(data.translatedCode);
      toast({
        title: "Translation Complete!",
        description: "Your code has been successfully translated.",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Code has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setSourceCode("");
    setTranslatedCode("");
    setSourceLang("");
    setTargetLang("");
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Code Translator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your code between any programming language with AI-powered precision
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">From:</label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">To:</label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Target Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant="hero" 
            onClick={handleTranslate}
            disabled={isLoading}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Translate
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Code Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Input Code
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(sourceCode)}
                disabled={!sourceCode.trim()}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste your code here..."
                className="h-96 font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Translated Code
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(translatedCode)}
                disabled={!translatedCode.trim()}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={translatedCode}
                readOnly
                placeholder="Translated code will appear here..."
                className="h-96 font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Backend Notice */}
        <div className="mt-8 p-6 bg-card border rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Real-time AI Code Translation</h3>
          <p className="text-muted-foreground mb-4">
            Powered by Google Gemini AI and secured with Supabase authentication. Your translations are automatically saved to your history.
          </p>
          <div className="flex gap-2 justify-center text-sm text-muted-foreground">
            <span>✅ Authentication</span>
            <span>✅ Google Gemini API</span>
            <span>✅ Translation History</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;