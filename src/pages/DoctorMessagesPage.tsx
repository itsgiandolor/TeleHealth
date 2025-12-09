import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, LogOut, LayoutDashboard, Stethoscope, MessageSquare, Send, Search, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: string;
    sender: "user" | "patient";
    content: string;
    timestamp: string;
}

interface Conversation {
    id: string;
    patientName: string;
    age: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    messages: Message[];
}

const conversations: Conversation[] = [
    {
        id: "1",
        patientName: "Gian D.",
        age: "30 years old",
        avatar: "https://i.pravatar.cc/80?u=gian",
        lastMessage: "Thank you for the medication recommendation",
        lastMessageTime: "30 minutes ago",
        messages: [
            {
                id: "m1",
                sender: "user",
                content: "Hello Gian, how are you feeling with the current treatment?",
                timestamp: "Today 9:00 AM",
            },
            {
                id: "m2",
                sender: "patient",
                content: "Hi Dr. Reed! I'm feeling much better, the medication is really helping.",
                timestamp: "Today 9:15 AM",
            },
            {
                id: "m3",
                sender: "user",
                content: "That's great to hear! Please continue as prescribed and monitor your symptoms.",
                timestamp: "Today 9:20 AM",
            },
            {
                id: "m4",
                sender: "patient",
                content: "Will do. I'll follow up with you next week.",
                timestamp: "Today 9:25 AM",
            },
            {
                id: "m5",
                sender: "user",
                content: "Thank you for the medication recommendation",
                timestamp: "Today 3:45 PM",
            },
        ],
    },
    {
        id: "2",
        patientName: "Maria K.",
        age: "45 years old",
        avatar: "https://i.pravatar.cc/80?u=maria",
        lastMessage: "Looking forward to the next appointment",
        lastMessageTime: "2 hours ago",
        messages: [
            {
                id: "m1",
                sender: "user",
                content: "Maria, I have your lab results back.",
                timestamp: "Today 1:00 PM",
            },
            {
                id: "m2",
                sender: "patient",
                content: "Great! What do they show?",
                timestamp: "Today 1:05 PM",
            },
            {
                id: "m3",
                sender: "user",
                content: "Everything looks good. Your glucose levels are stable.",
                timestamp: "Today 1:10 PM",
            },
            {
                id: "m4",
                sender: "patient",
                content: "Looking forward to the next appointment",
                timestamp: "Today 1:45 PM",
            },
        ],
    },
    {
        id: "3",
        patientName: "John S.",
        age: "55 years old",
        avatar: "https://i.pravatar.cc/80?u=john",
        lastMessage: "I'll schedule that follow-up appointment",
        lastMessageTime: "1 day ago",
        messages: [
            {
                id: "m1",
                sender: "user",
                content: "John, how are the new medications working for you?",
                timestamp: "Yesterday 10:00 AM",
            },
            {
                id: "m2",
                sender: "patient",
                content: "They seem to be helping with the pain management.",
                timestamp: "Yesterday 10:15 AM",
            },
            {
                id: "m3",
                sender: "user",
                content: "Excellent. I'd like to see you again in two weeks to assess progress.",
                timestamp: "Yesterday 10:30 AM",
            },
            {
                id: "m4",
                sender: "patient",
                content: "I'll schedule that follow-up appointment",
                timestamp: "Yesterday 10:45 AM",
            },
        ],
    },
    {
        id: "4",
        patientName: "Sarah W.",
        age: "28 years old",
        avatar: "https://i.pravatar.cc/80?u=sarah",
        lastMessage: "Thanks for the health tips!",
        lastMessageTime: "3 days ago",
        messages: [
            {
                id: "m1",
                sender: "user",
                content: "Sarah, remember to get enough sleep and exercise regularly.",
                timestamp: "3 days ago 2:00 PM",
            },
            {
                id: "m2",
                sender: "patient",
                content: "Thanks for the health tips!",
                timestamp: "3 days ago 2:15 PM",
            },
        ],
    },
];

const DoctorMessagesPage = () => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>(selectedConversation.messages);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredConversations = conversations.filter(conv =>
        conv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Link to="/dashboard/doctor">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Link to="/doctor/schedule">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Clock className="h-4 w-4" /> Schedule
                            </Button>
                        </Link>
                        <Link to="/doctor/appointments">
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/doctor/patients">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Users className="h-4 w-4" /> Patients
                        </Button>
                    </Link>
                    <Link to="/doctor/messages">
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Messages
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
                    <p className="text-muted-foreground">Communicate with your patients.</p>
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
                                        placeholder="Search patients..."
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
                                                        <AvatarImage src={conv.avatar} alt={conv.patientName} />
                                                        <AvatarFallback>{conv.patientName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm">{conv.patientName}</p>
                                                        <p className="text-xs text-muted-foreground">{conv.age}</p>
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
                                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.patientName} />
                                        <AvatarFallback>{selectedConversation.patientName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{selectedConversation.patientName}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{selectedConversation.age}</p>
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

export default DoctorMessagesPage;
