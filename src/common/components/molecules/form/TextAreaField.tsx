import { FC, TextareaHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../../atoms/ui/form";
import { cn } from "@/common/lib/utils";
import { Textarea } from "../../atoms/ui/textarea";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
}

const TextAreaField: FC<Props> = ({ label, description, ...props }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={props?.name || "name"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...props} {...field} className={cn(props.className)} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaField;
