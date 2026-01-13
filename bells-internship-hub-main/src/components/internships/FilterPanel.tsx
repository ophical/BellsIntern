import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/mockData';

interface Filters {
  categories: string[];
  types: string[];
  duration: string[];
  stipendRange: [number, number];
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const internshipTypes = ['Remote', 'On-site', 'Hybrid'];
const durationOptions = ['1-2 months', '3 months', '4-6 months', '6+ months'];

export function FilterPanel({ filters, onChange, onClose, isMobile = false }: FilterPanelProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    onChange({ ...filters, categories: newCategories });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.types, type]
      : filters.types.filter(t => t !== type);
    onChange({ ...filters, types: newTypes });
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    const newDurations = checked
      ? [...filters.duration, duration]
      : filters.duration.filter(d => d !== duration);
    onChange({ ...filters, duration: newDurations });
  };

  const handleStipendChange = (value: number[]) => {
    onChange({ ...filters, stipendRange: [value[0], value[1]] });
  };

  const clearFilters = () => {
    onChange({
      categories: [],
      types: [],
      duration: [],
      stipendRange: [0, 200000],
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.types.length > 0 || 
    filters.duration.length > 0 ||
    filters.stipendRange[0] > 0 || 
    filters.stipendRange[1] < 200000;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Internship Type</Label>
        <div className="space-y-2">
          {internshipTypes.map(type => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Duration</Label>
        <div className="space-y-2">
          {durationOptions.map(duration => (
            <div key={duration} className="flex items-center gap-2">
              <Checkbox
                id={`duration-${duration}`}
                checked={filters.duration.includes(duration)}
                onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
              />
              <label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer">
                {duration}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Stipend Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Stipend Range: ₦{filters.stipendRange[0].toLocaleString()} - ₦{filters.stipendRange[1].toLocaleString()}
        </Label>
        <Slider
          value={filters.stipendRange}
          min={0}
          max={200000}
          step={10000}
          onValueChange={handleStipendChange}
          className="mt-2"
        />
      </div>
    </div>
  );
}
