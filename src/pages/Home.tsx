import { ArrowRight, Code2, Sparkles, Zap, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Code2,
      title: "Multi-Language Support",
      description: "Translate between Python, JavaScript, Java, C++, and 20+ programming languages"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by Google's Gemini AI for instant, accurate code translations"
    },
    {
      icon: Globe,
      title: "Syntax Preservation", 
      description: "Maintains code structure, comments, and logic while adapting to target language"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your code is processed securely and never stored permanently"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow animate-float">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            AI Code Translator
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transform your code instantly between any programming language using advanced AI. 
            No more manual rewrites, just smart translation that preserves logic and structure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/translator">
              <Button variant="hero" size="xl" className="group">
                Start Translating
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* External Home link placeholder - update href when ready */}
            <a
              href="https://example.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="glass" size="xl" asChild>
                <span>Home</span>
              </Button>
            </a>
          </div>

          {/* Code Preview */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="code-panel">
              <div className="code-header">
                <span className="text-sm font-medium text-muted-foreground">Python</span>
                <span className="text-xs text-muted-foreground">Input</span>
              </div>
              <div className="p-4 bg-card/50">
                <pre className="text-sm text-left">
                  <code>{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`}</code>
                </pre>
              </div>
            </div>
            
            <div className="code-panel">
              <div className="code-header">
                <span className="text-sm font-medium text-muted-foreground">JavaScript</span>
                <span className="text-xs text-muted-foreground">Output</span>
              </div>
              <div className="p-4 bg-card/50">
                <pre className="text-sm text-left">
                  <code>{`function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(10));`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AI Code Translator?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make code translation seamless and accurate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-4 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Code?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust AI Code Translator for accurate, instant code conversion
          </p>
          <Link to="/translator">
            <Button variant="secondary" size="xl" className="group">
              Get Started for Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;