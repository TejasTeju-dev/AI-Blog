"use client"

import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { SimpleBackground } from "@/components/simple-background"
import dynamic from 'next/dynamic'
import { AnimatedGrid } from "@/components/animated-grid"
import { ParticleField } from "@/components/particle-field"

const ThreeDBackground = dynamic(
  () => import("@/components/3d-background").then((mod) => mod.ThreeDBackground),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
    suspense: true
  }
)

interface FeaturedCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  slug?: string;
}

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  slug?: string;
  image: string;
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen text-white perspective-container relative">
      <div className="fixed inset-0 z-0">
        <ThreeDBackground />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-1"></div>

      <Navbar onSubscribeClick={scrollToNewsletter} />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <section className="min-h-screen flex items-center justify-center mb-20 depth-layer-1">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Exploring the Frontiers of <span className="gradient-text">Artificial Intelligence</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Deep insights into AI, GenAI, Computer Vision, and Deep Learning advancements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="liquid-button depth-layer-2">
                  <Link href="/articles/">Latest Articles</Link>
                </Button>
                <Button variant="outline" className="liquid-button depth-layer-2" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button>
              </div>
            </div>
            {/* <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800 glass-card glow-effect depth-layer-2 floating">
              <Image
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="AI visualization showing neural network connections"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div> */}
          </div>
        </section>

        <section className="mb-20 depth-layer-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <Link
              href="/articles/"
              className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2 group"
            >
              View all <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              title="The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3"
              description="Explore the development of GAN architectures, highlighting key milestones like Progressive GAN, StyleGAN-1, StyleGAN-2, and the latest advancements in StyleGAN-3."
              image="https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&h=400&auto=format&fit=crop"
              date="May 15, 2023"
              category="GenAI"
              icon={<BrainCircuit className="h-5 w-5" />}
              slug="evolution-of-gans"
            />
            <FeaturedCard
              title="AI in 2025: Transforming Daily Life"
              description="Discuss how generative AI has integrated into everyday activities by 2025, providing personal style tips, translating conversations, analyzing diets, and more."
              image="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&h=400&auto=format&fit=crop"
              date="June 2, 2023"
              category="Future Tech"
              icon={<Cpu className="h-5 w-5" />}
              slug="ai-in-2025"
            />
            <FeaturedCard
              title="The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond"
              description="Examine the emergence of multimodal AI models that process and generate multiple data types, such as text, images, and videos, and their applications in various industries."
              image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop"
              date="June 28, 2023"
              category="AI Research"
              icon={<Eye className="h-5 w-5" />}
              slug="multimodal-ai-models"
            />
          </div>
        </section>

        <section className="mb-20 depth-layer-1">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCard
              title="Advancements in AI-Driven 3D Modeling and Virtual World Creation"
              description="Explore how AI is revolutionizing 3D modeling and virtual world creation, enabling users to transform written prompts into immersive experiences."
              category="3D Modeling"
              date="July 5, 2023"
              slug="ai-driven-3d-modeling"
              image="https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="The Integration of AI in Wearable Technology: Enhancing User Experience"
              description="Analyze the incorporation of AI into wearable devices, such as smart glasses, and how it enhances user interaction through features like real-world navigation and information accessibility."
              category="Wearable Tech"
              date="July 18, 2023"
              slug="ai-in-wearable-technology"
              image="https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Computer Vision in Autonomous Vehicles"
              description="Exploring how computer vision algorithms are enabling self-driving cars to perceive and navigate complex environments."
              category="Computer Vision"
              date="August 3, 2023"
              slug="computer-vision-autonomous-vehicles"
              image="https://images.unsplash.com/photo-1563630381190-77c336ea545a?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Deep Learning for Natural Language Processing"
              description="How transformer models have revolutionized our ability to understand and generate human language."
              category="NLP"
              date="August 15, 2023"
              slug="deep-learning-nlp"
              image="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Ethical Considerations in Generative AI"
              description="Examining the ethical implications of AI-generated content and the responsibility of AI researchers and practitioners."
              category="AI Ethics"
              date="September 2, 2023"
              slug="ethical-considerations-genai"
              image="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="The Future of AI Research: What's Next?"
              description="Predictions and insights into the next frontiers of artificial intelligence research and development."
              category="Future of AI"
              date="September 20, 2023"
              slug="future-of-ai-research"
              image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=400&auto=format&fit=crop"
            />
          </div>
        </section>

        <section
          ref={newsletterRef}
          id="newsletter"
          className="newsletter-section rounded-xl p-8 mb-20 depth-layer-2 shadow-3d"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-gray-400">
                Subscribe to our newsletter to receive the latest insights on AI advancements, tutorials, and industry
                news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-black/50 border-gray-800 focus-visible:ring-purple-500 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="liquid-button whitespace-nowrap" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Neural<span className="text-purple-500">Pulse</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Exploring the cutting edge of artificial intelligence and machine learning.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Topics</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Generative AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Computer Vision
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Deep Learning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Machine Learning
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Research Papers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Code Samples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Datasets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>ameyaudeshmukh@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} NeuralPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: FeaturedCardProps) {
  return (
    <Card className="glass-card overflow-hidden hover:border-purple-500/50 transition-colors h-full shadow-3d depth-layer-2">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover article-image" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link href={`/blog/${slug}/`} className="text-purple-500 hover:text-purple-400 group-hover:underline">
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}

function ArticleCard({ title, description, category, date, slug = "", image }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}/`} className="group article-card">
      <div className="space-y-3">
        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-colors shadow-3d">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} thumbnail`}
            fill
            className="object-cover article-image"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
