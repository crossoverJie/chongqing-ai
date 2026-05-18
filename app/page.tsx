"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Users,
  Zap,
  Globe,
  MessageCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Code2,
  Layers,
  Bot,
  ChevronDown,
  Mail,
  MapPin,
} from "lucide-react";

// Particle Animation Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}

// Team Member Data
const teamMembers = [
  {
    name: "滕昭永",
    role: "发起人",
    title: "科技公司 CEO",
    image: "/chongqing-ai/community/滕昭永.png",
    tags: ["发起人", "CEO"],
  },
  {
    name: "叶新",
    role: "联合发起人",
    title: "集团公司 CTO",
    image: "/chongqing-ai/community/叶新.png",
    tags: ["CTO", "技术领袖"],
  },
  {
    name: "郭骥",
    role: "联合发起人",
    title: "头部公有云泛企行业经理",
    image: "/chongqing-ai/community/郭骥.png",
    tags: ["云计算", "企业服务"],
  },
  {
    name: "谭建",
    role: "联合发起人",
    title: "AI Infra 技术专家",
    image: "/chongqing-ai/community/谭建.png",
    tags: ["AI Infra", "技术专家"],
  },
  {
    name: "宫祺",
    role: "秘书长",
    title: "社区运营负责人",
    image: "/chongqing-ai/community/宫祺.png",
    tags: ["秘书长", "运营"],
  },
  {
    name: "苏琴",
    role: "副秘书长",
    title: "社区运营",
    image: "/chongqing-ai/community/苏琴.png",
    tags: ["副秘书长", "运营"],
  },
  {
    name: "杨王军",
    role: "主理人",
    title: "OPC 主理人",
    image: "/chongqing-ai/community/杨王军.png",
    tags: ["OPC", "技术社区"],
  },
  {
    name: "陈杰",
    role: "主理人",
    title: "Vibe Coding 主理人",
    image: "/chongqing-ai/community/陈杰.png",
    tags: ["Vibe Coding", "编程"],
  },
  {
    name: "何康平",
    role: "主理人",
    title: "OpenClaw 龙虾主理人",
    image: "/chongqing-ai/community/何康平.png",
    tags: ["OpenClaw", "开源"],
  },
  {
    name: "张康健",
    role: "主理人",
    title: "AI 硬件主理人",
    image: "/chongqing-ai/community/张康健.png",
    tags: ["AI硬件", "硬件开发"],
  },
];

// Activity/SIG Data
const sigs = [
  {
    name: "OPC",
    description: "开放平台与技术交流",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Vibe Coding",
    description: "AI 辅助编程与开发",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "OpenClaw 龙虾",
    description: "开源项目与工具探索",
    icon: Bot,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "AI 硬件",
    description: "AI 硬件开发与实现",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
  },
];

export default function Home() {
  const [showWechatQR, setShowWechatQR] = useState(false);
  const [showWechatAccountQR, setShowWechatAccountQR] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      {/* Background Effects */}
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong py-3" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/chongqing-ai/community/yu-ai-logo.png"
                alt="渝AI Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold gradient-text">渝AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">关于我们</a>
              <a href="#team" className="text-slate-300 hover:text-cyan-400 transition-colors">团队成员</a>
              <a href="#sigs" className="text-slate-300 hover:text-cyan-400 transition-colors">兴趣小组</a>
              <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">加入我们</a>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0">
              立即加入
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <ParticleBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              重庆人工智能社区
            </Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">渝AI</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            连接重庆AI从业者，共建本地智能生态
          </p>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            渝AI是一个非盈利的AI技术社区，致力于推动重庆地区人工智能技术的交流、学习与落地应用
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 px-8 py-6 text-lg group">
              加入社区
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg">
              了解更多
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.5s" }}>
            {[
              { value: "500+", label: "社区成员" },
              { value: "10+", label: "核心成员" },
              { value: "4", label: "兴趣小组" },
              { value: "∞", label: "可能" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/30">
              <Layers className="w-3 h-3 mr-1" />
              关于我们
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              构建重庆<span className="gradient-text">AI生态</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              渝AI汇聚重庆地区AI从业者、研究者和爱好者，通过技术分享、项目合作和社群活动，推动本地人工智能产业发展
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "开放协作",
                description: "打破企业与个人边界，促进跨领域、跨行业的AI技术交流与合作",
                color: "cyan",
              },
              {
                icon: Zap,
                title: "实践导向",
                description: "关注AI技术的实际应用与落地，推动从理论到产品的完整闭环",
                color: "purple",
              },
              {
                icon: MessageCircle,
                title: "知识共享",
                description: "定期举办技术分享、工作坊和黑客松，共建学习成长的开放环境",
                color: "pink",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="glass p-8 hover:scale-[1.02] transition-transform duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SIGs Section */}
      <section id="sigs" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              <Cpu className="w-3 h-3 mr-1" />
              兴趣小组
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              探索<span className="gradient-text">AI各领域</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              加入感兴趣的技术小组，与志同道合的伙伴一起探索AI的无限可能
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sigs.map((sig, i) => (
              <Card
                key={i}
                className="glass p-6 hover:scale-[1.03] transition-all duration-300 group cursor-pointer overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sig.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sig.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <sig.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">{sig.name}</h3>
                <p className="text-slate-400 text-sm">{sig.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/30">
              <Users className="w-3 h-3 mr-1" />
              核心团队
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              认识我们的<span className="gradient-text">成员</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              来自不同背景的技术专家、创业者和AI爱好者，共同推动重庆AI社区发展
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <Card
                key={i}
                className="glass overflow-hidden hover:scale-[1.03] transition-all duration-300 group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-100 mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs mb-3 line-clamp-2">{member.title}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.slice(0, 2).map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-strong p-8 sm:p-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative z-10">
              <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                加入我们
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                成为渝AI<span className="gradient-text">一员</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                无论你是AI从业者、研究者还是爱好者，渝AI都欢迎你的加入。让我们一起推动重庆AI生态的发展！
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <div className="relative inline-block">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 px-8"
                    onMouseEnter={() => setShowWechatQR(true)}
                    onMouseLeave={() => setShowWechatQR(false)}
                    onClick={() => setShowWechatQR(!showWechatQR)}
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    加入微信群
                  </Button>
                  {showWechatQR && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 z-50 animate-in fade-in zoom-in-95 duration-200"
                      onMouseEnter={() => setShowWechatQR(true)}
                      onMouseLeave={() => setShowWechatQR(false)}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-black/30 border border-slate-200 w-96">
                        <Image
                          src="/chongqing-ai/community/yu-ai-wechat.png"
                          alt="微信二维码"
                          width={320}
                          height={320}
                          className="rounded-lg max-w-full h-auto"
                          priority
                        />
                        <p className="text-center text-slate-500 text-sm mt-3">扫一扫二维码，加入微信群</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
                    </div>
                  )}
                </div>
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8">
                  <Calendar className="mr-2 w-5 h-5" />
                  参加活动
                </Button>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 text-left">
                <div
                  className="relative flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 cursor-pointer"
                  onMouseEnter={() => setShowWechatAccountQR(true)}
                  onMouseLeave={() => setShowWechatAccountQR(false)}
                  onClick={() => setShowWechatAccountQR(!showWechatAccountQR)}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">微信公众号</div>
                    <div className="text-slate-200 text-sm font-medium">渝AI</div>
                  </div>
                  {showWechatAccountQR && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 z-50 animate-in fade-in zoom-in-95 duration-200"
                      onMouseEnter={() => setShowWechatAccountQR(true)}
                      onMouseLeave={() => setShowWechatAccountQR(false)}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-black/30 border border-slate-200 w-72">
                        <Image
                          src="/chongqing-ai/community/yu-ai-wechat-account.png"
                          alt="微信公众号二维码"
                          width={256}
                          height={256}
                          className="rounded-lg max-w-full h-auto"
                          priority
                        />
                        <p className="text-center text-slate-500 text-sm mt-3">扫一扫关注微信公众号</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
                    </div>
                  )}
                </div>
                {[
                  { icon: MapPin, label: "地点", value: "重庆" },
                  { icon: Mail, label: "联系邮箱", value: "hello@yu-ai.cn" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">{item.label}</div>
                      <div className="text-slate-200 text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/chongqing-ai/community/yu-ai-logo.png"
                alt="渝AI Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <p className="text-slate-600 text-sm">
              © 2024 渝AI. 共建重庆AI生态
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
