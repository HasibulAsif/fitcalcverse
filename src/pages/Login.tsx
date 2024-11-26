import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to authenticate the user
      // For now, we'll simulate a successful login
      localStorage.setItem('user', JSON.stringify({
        email: email,
        isAuthenticated: true
      }));

      toast({
        title: "Login Successful",
        description: "Welcome back to HT Workout!",
      });

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-gray-900 to-gray-900 opacity-70"></div>
      <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border-gray-700 relative z-10">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
            Welcome Back
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary/90 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;