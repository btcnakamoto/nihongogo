/**
 * 功能描述：应用主组件，配置路由和全局状态
 * 输入参数：无
 * 返回值：React 应用组件
 * 用途说明：定义应用的路由结构和全局布局
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout';
import { ProtectedRoute } from '@/components/common';
import HomePage from '@/pages/Home/HomePage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import AssessmentPage from '@/pages/Assessment/AssessmentPage';
import { CoursesPage, CourseDetailPage } from '@/pages/Courses';
import { ModulesPage, ModuleDetailPage } from '@/pages/Modules';
import { LoginPage, RegisterPage } from '@/pages/Auth';
import { TrialPage, TrialLearningPage, TrialLearningPageV2, CampBreakthroughLearning } from '@/pages/Trial';
import { LearningModulesDemo, IntelligentLearningDemo } from '@/pages/Demo';
import { IntelligentLearningPage } from '@/pages/IntelligentLearning';

const AssessmentResultPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="container-responsive">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">评估结果</h1>
      <p className="text-gray-600">评估结果页面正在开发中...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 公开路由 */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
          <Route path="/courses/:courseId" element={<Layout><CourseDetailPage /></Layout>} />
          <Route path="/modules" element={<Layout><ModulesPage /></Layout>} />
          <Route path="/modules/:moduleId" element={<Layout><ModuleDetailPage /></Layout>} />
          <Route path="/assessment" element={<Layout><AssessmentPage /></Layout>} />
          <Route path="/assessment/result" element={<Layout><AssessmentResultPage /></Layout>} />
          <Route path="/trial/:courseId" element={<TrialPage />} />
          <Route path="/trial/:courseId/learning" element={<TrialLearningPage />} />
          <Route path="/trial/:courseId/learning-v2" element={<TrialLearningPageV2 />} />
          <Route path="/trial/camp_breakthrough_90/learning" element={<CampBreakthroughLearning />} />
          <Route path="/intelligent-learning/:courseId" element={<IntelligentLearningPage />} />
          <Route path="/demo/learning-modules" element={<Layout><LearningModulesDemo /></Layout>} />
          <Route path="/demo/intelligent-learning" element={<Layout><IntelligentLearningDemo /></Layout>} />

          {/* 需要认证的路由 */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout><DashboardPage /></Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
