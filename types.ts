
export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  category?: string;
}

export interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface ComparisonRow {
  feature: string;
  compiler: 'check' | 'warning' | 'none';
  detekt: 'check' | 'warning' | 'none';
  lint: 'check' | 'warning' | 'none';
  ide: 'check' | 'warning' | 'none';
}
