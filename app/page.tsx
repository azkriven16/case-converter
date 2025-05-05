"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Trash2, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TextCaseConverter = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [activeTab, setActiveTab] = useState("uppercase");
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        convertText(e.target.value, activeTab);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        convertText(text, value);
    };

    const convertText = (inputText: string, type: string) => {
        if (!inputText) {
            setResult("");
            return;
        }

        switch (type) {
            case "uppercase":
                setResult(inputText.toUpperCase());
                break;
            case "lowercase":
                setResult(inputText.toLowerCase());
                break;
            case "titlecase":
                setResult(
                    inputText
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                        )
                        .join(" ")
                );
                break;
            case "sentencecase":
                setResult(
                    inputText
                        .toLowerCase()
                        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
                );
                break;
            case "camelcase": {
                const words = inputText.trim().split(/[\s-_]+/);
                setResult(
                    words[0].toLowerCase() +
                        words
                            .slice(1)
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                            )
                            .join("")
                );
                break;
            }
            case "pascalcase":
                setResult(
                    inputText
                        .trim()
                        .split(/[\s-_]+/)
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                        )
                        .join("")
                );
                break;
            case "snakecase":
                setResult(
                    inputText
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "_")
                        .replace(/[^a-zA-Z0-9_]/g, "")
                );
                break;
            default:
                setResult(inputText);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearText = () => {
        setText("");
        setResult("");
    };

    return (
        <div className="flex flex-col min-h-screen items-end justify-center gap-5 max-w-3xl mx-auto">
            <Button asChild>
                <a
                    href="https://github.com/azkriven16/case-converter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-sm"
                >
                    <span>Source</span>
                    <GithubIcon />
                </a>
            </Button>
            <Card className="shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Case Converter</CardTitle>
                    <CardDescription>
                        Transform text between different case formats instantly
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Case Selection */}
                    <Tabs
                        defaultValue="uppercase"
                        value={activeTab}
                        onValueChange={handleTabChange}
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full">
                            <TabsTrigger value="uppercase">UPPER</TabsTrigger>
                            <TabsTrigger value="lowercase">lower</TabsTrigger>
                            <TabsTrigger value="titlecase">Title</TabsTrigger>
                            <TabsTrigger value="sentencecase">
                                Sentence
                            </TabsTrigger>
                            <TabsTrigger value="camelcase">camel</TabsTrigger>
                            <TabsTrigger value="pascalcase">Pascal</TabsTrigger>
                            <TabsTrigger value="snakecase">snake</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Input Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    Input
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                    {text.length} chars
                                </Badge>
                            </div>
                            {text && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearText}
                                    className="h-8"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Clear
                                </Button>
                            )}
                        </div>
                        <Textarea
                            placeholder="Type or paste your text here..."
                            className="min-h-24 resize-none"
                            value={text}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Output Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    Result
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                    {result.length} chars
                                </Badge>
                            </div>
                            {result && (
                                <Button
                                    variant={copied ? "secondary" : "outline"}
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="h-8"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 mr-1" />
                                    ) : (
                                        <Copy className="h-4 w-4 mr-1" />
                                    )}
                                    {copied ? "Copied" : "Copy"}
                                </Button>
                            )}
                        </div>
                        <Textarea
                            className="min-h-24 resize-none"
                            value={result}
                            readOnly
                            placeholder="Converted text will appear here"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TextCaseConverter;
