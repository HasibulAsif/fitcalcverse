import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Copy, Send, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiFitnessAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-fitness-chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) throw error;

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Fitness Assistant</h1>
      
      <Card className="h-[600px] flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 mb-4 ${
                message.role === 'assistant' ? 'bg-muted/50 rounded-lg p-3' : ''
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-6 h-6 text-primary mt-1" />
              ) : (
                <User className="w-6 h-6 text-muted-foreground mt-1" />
              )}
              <div className="flex-1">
                <div className="prose dark:prose-invert">
                  {message.content}
                </div>
                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => copyToClipboard(message.content)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4 bg-muted/50 rounded-lg p-3">
              <Bot className="w-6 h-6 text-primary animate-pulse" />
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, nutrition, or fitness advice..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiFitnessAssistant;