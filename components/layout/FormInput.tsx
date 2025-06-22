import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FormInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'textarea'
  placeholder?: string
  error?: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({ label, name, type = 'text', placeholder, error, required, className, value, onChange, ...props }, ref) => {
    const inputId = `input-${name}`
    
    return (
      <div className={cn("space-y-2", className)}>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <Textarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
            {...props}
          />
        ) : (
          <Input
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn(
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            {...props}
          />
        )}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput 