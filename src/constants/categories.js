import {
	BookOpen,
	Brain,
	Laptop,
	Server,
	Smartphone,
} from "lucide-react";

export const categories = [
	"Web App",
	"Mobile App",
	"AI / Chatbot",
	"API / Backend",
	"Learning",
	"Other",
];

export const categoryStyles = {
	"Web App": { Icon: Laptop, color: "#e0966c" },
	"Mobile App": { Icon: Smartphone, color: "#f0b84b" },
	"AI / Chatbot": { Icon: Brain, color: "#2dd4bf" },
	"API / Backend": { Icon: Server, color: "#8fbf91" },
	Learning: { Icon: BookOpen, color: "#b4a0fa" },
	Other: { Icon: Laptop, color: "#ff8f78" },
	default: { Icon: Laptop, color: "#ff8f78" },
};