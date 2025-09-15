import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const History = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [translations, setTranslations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTranslations();
    }
  }, [user]);

  const fetchTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching translations:', error);
        toast({
          title: "Error Loading History",
          description: "Failed to load your translation history.",
          variant: "destructive",
        });
      } else {
        setTranslations(data || []);
      }
    } catch (error) {
      console.error('Error fetching translations:', error);
      toast({
        title: "Error Loading History",
        description: "Failed to load your translation history.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting translation:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete translation.",
          variant: "destructive",
        });
      } else {
        setTranslations(prev => prev.filter(t => t.id !== id));
        toast({
          title: "Translation Deleted",
          description: "Translation has been removed from your history.",
        });
      }
    } catch (error) {
      console.error('Error deleting translation:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete translation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Translation History
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View and manage your past code translations
          </p>
        </div>

        <div className="mb-8 p-6 bg-card border rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Your Translation History</h3>
          <p className="text-muted-foreground mb-4">
            All your code translations are automatically saved and secured with authentication.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-primary rounded-2xl w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loading History...</h3>
          </div>
        ) : translations.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-primary rounded-2xl w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Translations Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start translating code to see your history here
            </p>
            <Button variant="hero" asChild>
              <a href="/translator">Start Translating</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {translations.map((translation) => (
              <Card key={translation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg">Translation #{translation.id.slice(0, 8)}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{translation.source_language}</Badge>
                      <span className="text-muted-foreground">→</span>
                      <Badge variant="outline">{translation.target_language}</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    <span>{new Date(translation.created_at).toLocaleString()}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Source ({translation.source_language})
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(translation.input_code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-md border">
                        <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                          {translation.input_code}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Output ({translation.target_language})
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(translation.output_code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-md border">
                        <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                          {translation.output_code}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(translation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;