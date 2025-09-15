import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Cpu, Database, Lock, Zap, Globe } from "lucide-react";

const About = () => {
  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Supabase", category: "Backend" },
    { name: "Google Gemini AI", category: "AI/ML" },
    { name: "Lovable", category: "Platform" },
  ];

  const features = [
    {
      icon: Code2,
      title: "20+ Programming Languages",
      description: "Support for all major programming languages including Python, JavaScript, Java, C++, Go, Rust, and many more."
    },
    {
      icon: Cpu,
      title: "Google Gemini AI",
      description: "Powered by Google's most advanced AI model specifically trained for code understanding and generation."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get accurate translations in seconds, not minutes. Optimized for speed without compromising quality."
    },
    {
      icon: Globe,
      title: "Syntax Preservation",
      description: "Maintains code logic, structure, and comments while adapting to target language conventions."
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your code is processed securely with enterprise-grade encryption and privacy protection."
    },
    {
      icon: Database,
      title: "Translation History",
      description: "Keep track of all your translations with searchable history and easy code retrieval."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About AI Code Translator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the way developers work with code across different programming languages
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI Code Translator was built to solve a common problem developers face: translating code between different programming languages. 
              Whether you're migrating legacy systems, learning new languages, or working across multi-language projects, our AI-powered 
              tool makes code translation accurate, fast, and reliable. We believe that language barriers shouldn't slow down innovation.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-2 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
            <CardDescription>
              Built with modern technologies for performance, scalability, and developer experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                  {tech.name}
                  <span className="ml-2 text-xs text-muted-foreground">({tech.category})</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-primary rounded-full text-white font-bold text-sm min-w-[32px] text-center">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Input Your Code</h4>
                  <p className="text-muted-foreground">Paste or type your source code in any supported programming language.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-primary rounded-full text-white font-bold text-sm min-w-[32px] text-center">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Select Languages</h4>
                  <p className="text-muted-foreground">Choose your source language and target language from our extensive list.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-primary rounded-full text-white font-bold text-sm min-w-[32px] text-center">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AI Translation</h4>
                  <p className="text-muted-foreground">Our Google Gemini AI analyzes and translates your code while preserving logic and structure.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-primary rounded-full text-white font-bold text-sm min-w-[32px] text-center">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get Results</h4>
                  <p className="text-muted-foreground">Receive clean, syntactically correct code in your target language, ready to use.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact/Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Support & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We're constantly improving AI Code Translator based on user feedback. If you encounter any issues, 
              have feature requests, or just want to share your experience, we'd love to hear from you.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Platform:</strong> Built on Lovable</p>
              <p><strong>AI Provider:</strong> Google Gemini API</p>
              <p><strong>Backend:</strong> Supabase Integration</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;