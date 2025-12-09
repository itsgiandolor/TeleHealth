import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, LogOut, LayoutDashboard, User, Stethoscope, MessageSquare, Send, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: string;
    sender: "user" | "doctor";
    content: string;
    timestamp: string;
}

interface Conversation {
    id: string;
    doctorName: string;
    specialty: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    messages: Message[];
}

const conversations: Conversation[] = [
    {
        id: "1",
        doctorName: "Dr. Evelyn Reed",
        specialty: "Cardiologist",
        avatar: "https://i.pravatar.cc/80?u=dr-reed",
        lastMessage: "How are you feeling today?",
        lastMessageTime: "2 hours ago",
        messages: [
            {
                id: "m1",
                sender: "doctor",
                content: "Hello! How are you feeling with your hypertension medication?",
                timestamp: "Today 10:30 AM",
            },
            {
                id: "m2",
                sender: "user",
                content: "Hi Dr. Reed! I'm feeling much better. The medication seems to be working well.",
                timestamp: "Today 10:35 AM",
            },
            {
                id: "m3",
                sender: "doctor",
                content: "That's great to hear! Please continue taking it as prescribed. How are your readings?",
                timestamp: "Today 10:40 AM",
            },
            {
                id: "m4",
                sender: "user",
                content: "They've been fairly stable. Around 130/85 most days.",
                timestamp: "Today 10:45 AM",
            },
            {
                id: "m5",
                sender: "doctor",
                content: "How are you feeling today?",
                timestamp: "Today 2:15 PM",
            },
        ],
    },
    {
        id: "2",
        doctorName: "Dr. Marcus Chen",
        specialty: "Dermatologist",
        avatar: "https://i.pravatar.cc/80?u=dr-chen",
        lastMessage: "Remember to apply the cream twice daily",
        lastMessageTime: "1 day ago",
        messages: [
            {
                id: "m1",
                sender: "doctor",
                content: "I've prescribed a new cream for your skin condition.",
                timestamp: "Yesterday 3:00 PM",
            },
            {
                id: "m2",
                sender: "user",
                content: "Thank you! When should I start using it?",
                timestamp: "Yesterday 3:10 PM",
            },
            {
                id: "m3",
                sender: "doctor",
                content: "Remember to apply the cream twice daily",
                timestamp: "Yesterday 3:15 PM",
            },
        ],
    },
    {
        id: "3",
        doctorName: "Dr. Sarah Johnson",
        specialty: "General Physician",
        avatar: "https://i.pravatar.cc/80?u=dr-johnson",
        lastMessage: "Follow up in 2 weeks",
        lastMessageTime: "3 days ago",
        messages: [
            {
                id: "m1",
                sender: "doctor",
                content: "Your lab results came back normal.",
                timestamp: "3 days ago 2:00 PM",
            },
            {
                id: "m2",
                sender: "user",
                content: "That's wonderful! What should I do next?",
                timestamp: "3 days ago 2:30 PM",
            },
            {
                id: "m3",
                sender: "doctor",
                content: "Follow up in 2 weeks",
                timestamp: "3 days ago 2:35 PM",
            },
        ],
    },
];

const PatientMessagesPage = () => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>(selectedConversation.messages);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredConversations = conversations.filter(conv =>
        conv.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setMessages(conversation.messages);
        setMessageInput("");
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: Message = {
                id: `m${messages.length + 1}`,
                sender: "user",
                content: messageInput,
                timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }),
            };
            setMessages([...messages, newMessage]);
            setMessageInput("");
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span>Telemedicine</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link to="/dashboard/patient">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Link to="/patient/appointments">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Calendar className="h-4 w-4" /> Appointments
                            </Button>
                        </Link>
                        <Link to="/patient/appointment-requests">
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/patient/records">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> Medical Records
                        </Button>
                    </Link>
                    <Link to="/patient/messages">
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Messages
                        </Button>
                    </Link>
                    <Link to="/patient/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" /> Profile
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Messages</h1>
                    <p className="text-muted-foreground">Communicate with your healthcare providers.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {/* Conversations List */}
                    <Card className="md:col-span-1 flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Conversations</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 px-6">
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search conversations..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <ScrollArea className="h-full">
                                <div className="space-y-2">
                                    {filteredConversations.map((conv) => (
                                        <div key={conv.id}>
                                            <button
                                                onClick={() => handleSelectConversation(conv)}
                                                className={`w-full text-left p-3 rounded-lg transition-colors ${selectedConversation.id === conv.id
                                                    ? "bg-primary/10 border-l-4 border-primary"
                                                    : "hover:bg-muted"
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={conv.avatar} alt={conv.doctorName} />
                                                        <AvatarFallback>{conv.doctorName.charAt(4)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm">{conv.doctorName}</p>
                                                        <p className="text-xs text-muted-foreground">{conv.specialty}</p>
                                                        <p className="text-xs text-muted-foreground mt-1 truncate">{conv.lastMessage}</p>
                                                    </div>
                                                </div>
                                            </button>
                                            <Separator className="my-2" />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Chat Area */}
                    <Card className="md:col-span-2 flex flex-col">
                        {/* Chat Header */}
                        <CardHeader className="border-b pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.doctorName} />
                                        <AvatarFallback>{selectedConversation.doctorName.charAt(4)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{selectedConversation.doctorName}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{selectedConversation.specialty}</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        {/* Messages Area */}
                        <CardContent className="flex-1 p-6 overflow-y-auto">
                            <ScrollArea className="h-full">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === "user"
                                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                                    : "bg-muted text-muted-foreground rounded-bl-none"
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className={`text-xs mt-1 ${message.sender === "user"
                                                    ? "text-primary-foreground/70"
                                                    : "text-muted-foreground"
                                                    }`}>
                                                    {message.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        {/* Message Input */}
                        <div className="border-t p-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Type your message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSendMessage}
                                    disabled={!messageInput.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default PatientMessagesPage;
