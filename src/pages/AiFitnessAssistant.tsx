import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Copy, Send, User, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiFitnessAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-fitness-chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) throw error;

      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        AI Fitness Assistant
      </h1>
      
      <Card className="h-[600px] flex flex-col backdrop-blur-xl bg-background/95 border-white/20">
        <ScrollArea 
          className="flex-1 p-4 space-y-4"
          ref={scrollAreaRef}
        >
          <div className="bg-muted/50 rounded-lg p-3 animate-fade-in">
            <div className="flex gap-3">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <div className="prose dark:prose-invert">
                  Hello! I'm your AI Fitness Assistant. I can help you with workout plans, nutrition advice, and achieving your fitness goals. How can I assist you today?
                </div>
              </div>
            </div>
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 transition-all duration-300 ease-in-out",
                message.role === 'assistant' ? "bg-muted/50 rounded-lg p-3" : "",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-6 h-6 text-primary mt-1" />
              ) : (
                <User className="w-6 h-6 text-muted-foreground mt-1" />
              )}
              <div className="flex-1 space-y-2">
                <div className="prose dark:prose-invert">
                  {message.content}
                </div>
                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hover:bg-primary/20 transition-colors"
                    onClick={() => copyToClipboard(message.content, index)}
                  >
                    {copiedIndex === index ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 bg-muted/50 rounded-lg p-3 animate-fade-in">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, nutrition, or fitness advice..."
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
              className="bg-background/50 border-white/20 focus:border-primary/50 transition-colors"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/80 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiFitnessAssistant;