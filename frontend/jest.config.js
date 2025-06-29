/**
 * 功能描述：Jest 测试配置文件
 * 输入参数：无
 * 返回值：Jest 配置对象
 * 用途说明：配置 Jest 测试环境，支持 TypeScript 和 React 组件测试
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 根目录
  rootDir: '.',
  
  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/test/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/*.test.{ts,tsx}'
  ],
  
  // 模块文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // 转换配置
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // 模块名映射（支持路径别名）
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // 设置文件
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  
  // 覆盖率配置
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // 忽略的文件和目录
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  
  // 模块路径忽略模式
  modulePathIgnorePatterns: [
    '<rootDir>/dist/'
  ],
  
  // 清除模拟
  clearMocks: true,
  
  // 重置模拟
  resetMocks: true,
  
  // 恢复模拟
  restoreMocks: true
};
