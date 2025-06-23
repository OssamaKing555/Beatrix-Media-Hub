'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Type, 
  Image, 
  Video, 
  Layout, 
  MousePointer, 
  Save, 
  Eye, 
  Smartphone, 
  Monitor,
  Trash2,
  Settings,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  GripVertical,
  Move,
  Layers,
  Download,
  Lock,
  Unlock,
  Square,
  Zap,
  Sparkles,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';
import siteConfig from '@/data/siteConfig.json';

interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'hero';
  content: any;
  styles: any;
  locked?: boolean;
}

const componentTemplates = {
  text: {
    content: { text: 'Edit this text...' },
    styles: { 
      fontSize: '16px', 
      color: '#ffffff', 
      textAlign: 'left',
      padding: '16px',
      backgroundColor: 'transparent',
      borderRadius: '8px'
    }
  },
  image: {
    content: { src: '/placeholder-image.jpg', alt: 'Image' },
    styles: { 
      width: '100%', 
      height: 'auto',
      borderRadius: '8px'
    }
  },
  button: {
    content: { text: 'Click me', link: '#' },
    styles: { 
      backgroundColor: siteConfig.ui.theme.primary,
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600'
    }
  },
  section: {
    content: { title: 'Section Title', description: 'Section description...' },
    styles: { 
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '40px',
      margin: '20px 0',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }
  },
  hero: {
    content: { 
      title: 'Hero Title', 
      subtitle: 'Hero subtitle...',
      buttonText: 'Get Started'
    },
    styles: { 
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      padding: '80px 20px',
      textAlign: 'center',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)'
    }
  }
};

function SortableComponent({ component, isSelected, onSelect, onUpdate, onDelete }: {
  component: Component;
  isSelected: boolean;
  onSelect: (component: Component) => void;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderComponent = () => {
    const baseClasses = `relative ${isSelected ? 'ring-2 ring-purple-400 ring-offset-2' : ''} cursor-pointer transition-all duration-200`;
    
    switch (component.type) {
      case 'text':
        return (
          <div 
            className={baseClasses}
            style={{ ...component.styles, ...style }}
            onClick={() => onSelect(component)}
          >
            {component.content.text}
            {isSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Type className="w-3 h-3" />
                Text
              </motion.div>
            )}
          </div>
        );
      
      case 'image':
        return (
          <div 
            className={baseClasses}
            onClick={() => onSelect(component)}
          >
            <img 
              src={component.content.src} 
              alt={component.content.alt}
              style={{ ...component.styles, ...style }}
              className="w-full"
            />
            {isSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Image className="w-3 h-3" />
                Image
              </motion.div>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div 
            className={baseClasses}
            onClick={() => onSelect(component)}
          >
            <button 
              style={{ ...component.styles, ...style }}
              className="inline-block"
            >
              {component.content.text}
            </button>
            {isSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Square className="w-3 h-3" />
                Button
              </motion.div>
            )}
          </div>
        );
      
      case 'section':
        return (
          <div 
            className={baseClasses}
            style={{ ...component.styles, ...style }}
            onClick={() => onSelect(component)}
          >
            <h3 className="text-xl font-bold mb-2">{component.content.title}</h3>
            <p>{component.content.description}</p>
            {isSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Layout className="w-3 h-3" />
                Section
              </motion.div>
            )}
          </div>
        );
      
      case 'hero':
        return (
          <div 
            className={baseClasses}
            style={{ ...component.styles, ...style }}
            onClick={() => onSelect(component)}
          >
            <h1 className="text-4xl font-bold mb-4">{component.content.title}</h1>
            <p className="text-xl mb-6">{component.content.subtitle}</p>
            <button 
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              {component.content.buttonText}
            </button>
            {isSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                Hero
              </motion.div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="relative group">
        {renderComponent()}
        
        {/* Component Controls */}
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 flex items-center gap-1 bg-white rounded-lg shadow-lg p-1"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(component.id, { locked: !component.locked });
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {component.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(component.id);
              }}
              className="p-1 hover:bg-red-100 rounded text-red-500"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        )}
        
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move bg-black/50 text-white p-1 rounded"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

export default function VisualEditor() {
  const { user } = useAuth();
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Check permissions
  useEffect(() => {
    if (!user || user.role !== 'super_admin') {
      toast.error('Access denied. Super admin required.');
      router.push('/admin');
    }
  }, [user, router]);

  if (!user || user.role !== 'super_admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only super admins can access the visual editor.</p>
          <Button onClick={() => router.push('/admin')} className="mt-4">
            Go to Admin
          </Button>
        </div>
      </div>
    );
  }

  // Save data
  const savePage = async () => {
    const pageData = { components, lastModified: new Date().toISOString() };
    localStorage.setItem('visual-editor-data', JSON.stringify(pageData));
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Page saved successfully!');
  };

  // Add component
  const addComponent = (type: keyof typeof componentTemplates) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      content: { ...componentTemplates[type].content },
      styles: { ...componentTemplates[type].styles },
      locked: false
    };
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} component added`);
  };

  // Update component
  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  };

  // Delete component
  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
    toast.success('Component deleted');
  };

  // Drag and drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h1 className="text-2xl font-bold">Visual Editor</h1>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Super Admin Only
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={savePage} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Page
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Components */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4 flex items-center">
            <Layers className="w-4 h-4 mr-2" />
            Components
          </h3>
          
          <div className="space-y-2 mb-6">
            {Object.entries(componentTemplates).map(([type, template]) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => addComponent(type as keyof typeof componentTemplates)}
              >
                <GripVertical className="w-4 h-4 mr-3 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium capitalize">{type}</div>
                  <div className="text-sm text-gray-500">
                    {type === 'text' && 'Add text content'}
                    {type === 'image' && 'Add an image'}
                    {type === 'button' && 'Add a button'}
                    {type === 'section' && 'Add a section'}
                    {type === 'hero' && 'Add a hero section'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Page Components ({components.length})</h4>
            <div className="space-y-2">
              {components.map((component, index) => (
                <motion.div
                  key={component.id}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-2 rounded border cursor-pointer ${
                    selectedComponent?.id === component.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedComponent(component)}
                >
                  <Move className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="text-sm capitalize">{component.type}</span>
                  <span className="text-xs text-gray-500 ml-auto">#{index + 1}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="w-4 h-4 mr-1" />
                    Desktop
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-4 h-4 mr-1" />
                    Mobile
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div 
                className={`mx-auto bg-white shadow-lg ${
                  previewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
                } min-h-[600px] relative transition-all duration-300`}
              >
                <div className="p-8">
                  {components.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20 text-gray-500"
                    >
                      <MousePointer className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">Click components to add them</p>
                      <p className="text-sm">Use the sidebar to add text, images, buttons, and more</p>
                    </motion.div>
                  ) : (
                    <SortableContext items={components} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4">
                        {components.map(component => (
                          <SortableComponent
                            key={component.id}
                            component={component}
                            isSelected={selectedComponent?.id === component.id}
                            onSelect={setSelectedComponent}
                            onUpdate={updateComponent}
                            onDelete={deleteComponent}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  )}
                </div>
              </div>
              
              <DragOverlay>
                {activeId ? (
                  <div className="opacity-50">
                    {components.find(comp => comp.id === activeId) && (
                      <SortableComponent
                        component={components.find(comp => comp.id === activeId)!}
                        isSelected={false}
                        onSelect={() => {}}
                        onUpdate={() => {}}
                        onDelete={() => {}}
                      />
                    )}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Properties
          </h3>
          
          {selectedComponent ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Component Info */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{selectedComponent.type} Component</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteComponent(selectedComponent.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">ID: {selectedComponent.id}</p>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="styles">Styles</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  {selectedComponent.type === 'text' && (
                    <div className="space-y-3">
                      <div>
                        <Label>Text Content</Label>
                        <Textarea
                          value={selectedComponent.content.text}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            content: { ...selectedComponent.content, text: e.target.value }
                          })}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedComponent.type === 'image' && (
                    <div className="space-y-3">
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={selectedComponent.content.src}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            content: { ...selectedComponent.content, src: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={selectedComponent.content.alt}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            content: { ...selectedComponent.content, alt: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedComponent.type === 'button' && (
                    <div className="space-y-3">
                      <div>
                        <Label>Button Text</Label>
                        <Input
                          value={selectedComponent.content.text}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            content: { ...selectedComponent.content, text: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={selectedComponent.content.link}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            content: { ...selectedComponent.content, link: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="styles" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Background Color</Label>
                      <Input
                        type="color"
                        value={selectedComponent.styles.backgroundColor || '#000000'}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          styles: { ...selectedComponent.styles, backgroundColor: e.target.value }
                        })}
                      />
                    </div>
                    
                    {selectedComponent.type === 'text' && (
                      <>
                        <div>
                          <Label>Text Color</Label>
                          <Input
                            type="color"
                            value={selectedComponent.styles.color || '#000000'}
                            onChange={(e) => updateComponent(selectedComponent.id, {
                              styles: { ...selectedComponent.styles, color: e.target.value }
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label>Font Size</Label>
                          <Select
                            value={selectedComponent.styles.fontSize}
                            onValueChange={(value) => updateComponent(selectedComponent.id, {
                              styles: { ...selectedComponent.styles, fontSize: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12px">12px</SelectItem>
                              <SelectItem value="14px">14px</SelectItem>
                              <SelectItem value="16px">16px</SelectItem>
                              <SelectItem value="18px">18px</SelectItem>
                              <SelectItem value="20px">20px</SelectItem>
                              <SelectItem value="24px">24px</SelectItem>
                              <SelectItem value="32px">32px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Text Alignment</Label>
                          <div className="flex space-x-2">
                            <Button
                              variant={selectedComponent.styles.textAlign === 'left' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateComponent(selectedComponent.id, {
                                styles: { ...selectedComponent.styles, textAlign: 'left' }
                              })}
                            >
                              <AlignLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={selectedComponent.styles.textAlign === 'center' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateComponent(selectedComponent.id, {
                                styles: { ...selectedComponent.styles, textAlign: 'center' }
                              })}
                            >
                              <AlignCenter className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={selectedComponent.styles.textAlign === 'right' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateComponent(selectedComponent.id, {
                                styles: { ...selectedComponent.styles, textAlign: 'right' }
                              })}
                            >
                              <AlignRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500"
            >
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No component selected</p>
              <p className="text-sm">Click on a component to edit its properties</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 