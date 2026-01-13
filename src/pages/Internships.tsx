import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { SearchBar } from '@/components/internships/SearchBar';
import { FilterPanel } from '@/components/internships/FilterPanel';
import { Button } from '@/components/ui/button';
import { internships, savedInternships as initialSaved } from '@/lib/mockData';

interface Filters {
  categories: string[];
  types: string[];
  duration: string[];
  stipendRange: [number, number];
}

const suggestions = [
  'Software Engineer',
  'Marketing',
  'Finance',
  'Data Science',
  'UI/UX Design',
  'Lagos',
  'Remote',
  'TechCorp',
];

const Internships = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [saved, setSaved] = useState(initialSaved);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    types: [],
    duration: [],
    stipendRange: [0, 200000],
  });

  const searchQuery = searchParams.get('search') || '';

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const toggleSave = (id: string) => {
    setSaved(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          internship.title.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.location.toLowerCase().includes(query) ||
          internship.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(internship.category)) {
        return false;
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(internship.type)) {
        return false;
      }

      // Stipend filter (parse the stipend string to get the value)
      const stipendMatch = internship.stipend.match(/[\d,]+/);
      if (stipendMatch) {
        const stipendValue = parseInt(stipendMatch[0].replace(/,/g, ''));
        if (stipendValue < filters.stipendRange[0] || stipendValue > filters.stipendRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  const activeFilterCount = 
    filters.categories.length + 
    filters.types.length + 
    filters.duration.length +
    (filters.stipendRange[0] > 0 || filters.stipendRange[1] < 200000 ? 1 : 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Internships</h1>
          <p className="text-muted-foreground">Find your perfect internship opportunity</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              suggestions={suggestions}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Panel */}
          <aside className="hidden md:block w-72 shrink-0">
            <FilterPanel filters={filters} onChange={setFilters} />
          </aside>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <div 
                className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-4 overflow-y-auto"
              >
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onClose={() => setShowFilters(false)}
                  isMobile
                />
              </motion.div>
            </motion.div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredInternships.length}</span> internships
              </p>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSearchChange('')}
                  className="gap-2"
                >
                  Clear search
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {filteredInternships.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredInternships.map((internship, index) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    isSaved={saved.includes(internship.id)}
                    onToggleSave={toggleSave}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No internships found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSearchChange('');
                    setFilters({
                      categories: [],
                      types: [],
                      duration: [],
                      stipendRange: [0, 200000],
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Internships;
