# Dependency Injection with Inversify

This project uses Inversify for dependency injection.

## Usage

### Getting instances from the container

```typescript
import { container } from "./di";
import { TYPES } from "./di/types";
import { SignupUsecase } from "../application/usecase/auth/SignupUsecase";

// Get a use case instance
const signupUsecase = container.get<SignupUsecase>(TYPES.SignupUsecase);

// Use it
const result = await signupUsecase.execute(signupData);
```

### Example in a route handler

```typescript
import { Request, Response } from "express";
import { container } from "../di";
import { TYPES } from "../di/types";
import { SignupUsecase } from "../application/usecase/auth/SignupUsecase";

app.post("/auth/signup", async (req: Request, res: Response) => {
  try {
    const signupUsecase = container.get<SignupUsecase>(TYPES.SignupUsecase);
    const result = await signupUsecase.execute(req.body);
    res.json(result);
  } catch (error) {
    // Handle error
  }
});
```

## Configuration

- **Repositories**: Bound as singletons (one instance shared across the app)
- **Use Cases**: Bound as transient (new instance each time)

## Adding New Dependencies

1. Add a symbol to `types.ts`
2. Add `@injectable()` decorator to your class
3. Add `@inject(TYPES.YourSymbol)` to constructor parameters
4. Bind in `container.ts`

