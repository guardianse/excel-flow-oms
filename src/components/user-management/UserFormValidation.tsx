
import { z } from "zod";

// Define schemas for user validation
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address format"),
  role: z.enum(["Admin", "Warehouse Staff", "Viewer"], {
    required_error: "Please select a user role",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a user status",
  }),
});

export type UserFormData = z.infer<typeof userSchema>;

export const validateUserForm = (data: Partial<UserFormData>) => {
  try {
    userSchema.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce(
        (acc, curr) => {
          const field = curr.path[0] as string;
          acc[field] = curr.message;
          return acc;
        },
        {} as Record<string, string>
      );
      
      return { success: false, errors: fieldErrors };
    }
    return { 
      success: false, 
      errors: { form: "An unexpected error occurred" } 
    };
  }
};

// Email validation regex (RFC 5322 compliant)
export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

// Password strength checking
export const checkPasswordStrength = (password: string): {
  strength: "weak" | "medium" | "strong";
  message: string;
} => {
  if (password.length < 8) {
    return { 
      strength: "weak", 
      message: "Password must be at least 8 characters" 
    };
  }
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strengthScore = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
  if (strengthScore <= 2) {
    return {
      strength: "weak",
      message: "Weak password - add uppercase, numbers, or special characters"
    };
  } else if (strengthScore === 3) {
    return {
      strength: "medium",
      message: "Medium strength password"
    };
  } else {
    return {
      strength: "strong",
      message: "Strong password"
    };
  }
};
