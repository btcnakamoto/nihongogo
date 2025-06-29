/**
 * 功能描述：颜色方案测试
 * 输入参数：无
 * 返回值：测试结果
 * 用途说明：验证 Tailwind CSS 颜色配置的正确性和一致性
 * 作者：nakamotochen
 * 创建时间：2025-06-14
 */

import tailwindConfig from '../../tailwind.config.js';

describe('颜色方案配置测试', () => {
  const colors = tailwindConfig.theme.extend.colors;

  test('主色调 (primary) 应该包含正确的绿色值', () => {
    expect(colors.primary).toBeDefined();
    expect(colors.primary[500]).toBe('#00ab55'); // rgb(0, 171, 85)
    
    // 验证主色调的完整色阶
    expect(colors.primary[50]).toBe('#f0fdf4');
    expect(colors.primary[100]).toBe('#dcfce7');
    expect(colors.primary[200]).toBe('#bbf7d0');
    expect(colors.primary[300]).toBe('#86efac');
    expect(colors.primary[400]).toBe('#4ade80');
    expect(colors.primary[600]).toBe('#009648');
    expect(colors.primary[700]).toBe('#00803d');
    expect(colors.primary[800]).toBe('#006b33');
    expect(colors.primary[900]).toBe('#00562a');
    expect(colors.primary[950]).toBe('#003d1f');
  });

  test('辅助色 (secondary) 应该是温暖的米白色系', () => {
    expect(colors.secondary).toBeDefined();

    // 验证辅助色的清新特征
    expect(colors.secondary[50]).toBe('#fefefe');
    expect(colors.secondary[100]).toBe('#fdfdfd');
    expect(colors.secondary[500]).toBe('#dadce0');
    expect(colors.secondary[900]).toBe('#3c4043');
  });

  test('强调色 (accent) 应该是清新的蓝绿色系', () => {
    expect(colors.accent).toBeDefined();

    // 验证强调色的清新蓝绿色特征
    expect(colors.accent[50]).toBe('#f0fdfa');
    expect(colors.accent[500]).toBe('#14b8a6');
    expect(colors.accent[900]).toBe('#134e4a');
  });

  test('成功色 (success) 应该保持柔和绿色', () => {
    expect(colors.success).toBeDefined();
    expect(colors.success[500]).toBe('#4ade80');
    expect(colors.success[600]).toBe('#22c55e');
  });

  test('警告色 (warning) 应该是柔和琥珀色', () => {
    expect(colors.warning).toBeDefined();
    expect(colors.warning[500]).toBe('#f4a952');
    expect(colors.warning[700]).toBe('#d97706');
  });

  test('错误色 (error) 应该是柔和红色', () => {
    expect(colors.error).toBeDefined();
    expect(colors.error[500]).toBe('#f06767');
    expect(colors.error[600]).toBe('#e53e3e');
  });

  test('中性色 (neutral) 应该是清新的象牙白色系', () => {
    expect(colors.neutral).toBeDefined();

    // 验证中性色的清新特征
    expect(colors.neutral[50]).toBe('#fefefe');
    expect(colors.neutral[100]).toBe('#fcfcfc');
    expect(colors.neutral[500]).toBe('#8a8d91');
    expect(colors.neutral[900]).toBe('#242526');
  });

  test('清新色系 (fresh) 应该提供专为清新设计的浅色调', () => {
    expect(colors.fresh).toBeDefined();

    // 验证清新色系的特征
    expect(colors.fresh[50]).toBe('#f8fffe');
    expect(colors.fresh[100]).toBe('#f0fdf9');
    expect(colors.fresh[500]).toBe('#6ee7b7');
    expect(colors.fresh[900]).toBe('#047857');
  });
});

describe('颜色对比度测试', () => {
  // 简单的对比度计算函数
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  test('主色调与白色背景应该有足够的对比度', () => {
    const colors = tailwindConfig.theme.extend.colors;
    const contrastRatio = getContrastRatio(colors.primary[600], '#ffffff');
    
    // WCAG AA 标准要求对比度至少为 4.5:1
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });

  test('主色调与中性色文本应该有足够的对比度', () => {
    const colors = tailwindConfig.theme.extend.colors;
    const contrastRatio = getContrastRatio(colors.primary[500], colors.neutral[900]);
    
    // 应该有良好的对比度
    expect(contrastRatio).toBeGreaterThanOrEqual(3);
  });
});

describe('颜色一致性测试', () => {
  test('所有颜色系列应该包含完整的色阶', () => {
    const colors = tailwindConfig.theme.extend.colors;
    const colorSeries = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'neutral'];
    const expectedShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    colorSeries.forEach(series => {
      expect(colors[series]).toBeDefined();
      expectedShades.forEach(shade => {
        expect(colors[series][shade]).toBeDefined();
        expect(typeof colors[series][shade]).toBe('string');
        expect(colors[series][shade]).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  test('主品牌色应该是 rgb(0, 171, 85)', () => {
    const colors = tailwindConfig.theme.extend.colors;
    const primaryColor = colors.primary[500];
    
    // 验证主品牌色的 RGB 值
    const rgb = hexToRgb(primaryColor);
    expect(rgb).not.toBeNull();
    expect(rgb!.r).toBe(0);
    expect(rgb!.g).toBe(171);
    expect(rgb!.b).toBe(85);
  });
});
