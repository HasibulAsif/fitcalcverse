import { useState } from "react";
import { Bot, X, Maximize2, Minimize2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const handleSend = () => {
    if (message.trim()) {
      // Here you would implement the actual chat functionality
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={`
          w-[380px] transition-all duration-300 ease-in-out
          ${isMinimized ? 'h-[60px]' : 'h-[500px]'}
          bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        `}>
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-semibold">HT Fitness Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[380px]">
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">
                    Hello! I'm your HT Fitness Assistant. How can I help you today?
                  </p>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={handleSend} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full h-12 w-12 shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AIAssistant;