
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Student from "./pages/Student";
import Employee from "./pages/Employee";
import General from "./pages/General";
import History from "./pages/History";
import TemplateBuilder from "./pages/TemplateBuilder";
import TemplateList from "./pages/TemplateList";
import TemplateForm from "./pages/TemplateForm";
import SharedTemplate from "./pages/SharedTemplate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/general" element={<General />} />
          <Route path="/history" element={<History />} />
          <Route path="/template" element={<TemplateList />} />
          <Route path="/template-list" element={<TemplateList />} />
          <Route path="/template/create" element={<TemplateBuilder />} />
          <Route path="/template/edit/:templateId" element={<TemplateBuilder />} />
          <Route path="/template/form/:templateId" element={<TemplateForm />} />
          <Route path="/template/form/:templateId/:recordId" element={<TemplateForm />} />
          <Route path="/shared/template/:templateId" element={<SharedTemplate />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
