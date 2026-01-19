# GemLanding Developer Manual (Oracle ARM64 Edition)

## 1. System Architecture
**GemLanding** is a "Backend-for-Frontend" (BFF) application designed to run as a privileged container on the Oracle Ampere server.

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion.
- **Backend:** Next.js API Routes (Node.js runtime).
- **Data Source:** Direct connection to `/var/run/docker.sock` (via `dockerode` or generic socket fetch) and host system metrics (via `systeminformation`).
- **Security:** NextAuth.js (Credentials Provider) guarding sensitive actions (`POST` requests).

## 2. Directory Structure
```
src/
├── app/
│   ├── api/            # Backend Logic
│   │   ├── system/     # Host Metrics (CPU/RAM)
│   │   ├── services/   # Docker Integration
│   │   └── automation/ # Activepieces Webhooks
│   └── globals.css     # Theme Definitions (Obsidian/Ceramic/Cosmic)
├── components/
│   ├── layout/         # Shell (OrbitBar, GridContainer)
│   ├── ui/             # Reusable primitives (Card, Sparkline)
│   └── widgets/        # The actual dashboard tiles (ServiceDeck, AICortex)
├── lib/
│   ├── adapters/       # Mock vs Real data logic
│   └── types/          # TypeScript interfaces
└── auth.ts             # NextAuth Configuration
```

## 3. "Auto-Discovery" Protocol
To add a new app to the dashboard, **DO NOT EDIT THE CODE**.
Instead, add labels to the app's `compose.yaml` file in Dockge.

### The Label Schema
| Label | Value Example | Description |
| :--- | :--- | :--- |
| `gem.enable` | `"true"` | **Required.** Makes it visible. |
| `gem.group` | `"Gaming"` | Categorizes it in the Service Deck. |
| `gem.icon` | `"gamepad-2"` | *Planned:* Maps to Lucide icon name. |
| `gem.name` | `"Minecraft"` | *Optional:* Overrides container name. |

**Example `compose.yaml` entry:**
```yaml
services:
  minecraft:
    image: itzg/minecraft-server
    labels:
      - "gem.enable=true"
      - "gem.group=Gaming"
```

## 4. Theme System
Themes are defined in `app/globals.css` using CSS Variables.
To add a new theme (e.g., "Matrix"):
1. Add `[data-theme='matrix']` block in `globals.css`.
2. Define `--bg-app`, `--accent-primary`, etc.
3. Add the button to `components/widgets/ThemeSwitcher.tsx`.

## 5. Deployment Strategy (ARM64)

### Dockerfile
The project uses a multi-stage Dockerfile optimized for ARM64.
- **Base:** `node:18-alpine` (or 20).
- **Build:** runs `npm run build`.
- **Runner:** Copies `.next/standalone` for minimal footprint (~100MB).

### Deploy Command
```bash
# 1. Build Image
docker build -t gem-landing .

# 2. Run (with Docker Socket Access)
docker run -d \
  --name gem-landing \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart unless-stopped \
  gem-landing
```

## 6. Development Workflow
1. **Mock Mode:** Locally on Windows, the API returns mock data (defined in `lib/adapters` or `api/services/list`).
2. **Production Mode:** When deployed, the adapters should switch to Real Mode (checking `process.env.NODE_ENV` or `DOCKER_HOST`).

### Key Env Vars
- `ADMIN_PASSWORD`: The login password.
- `AUTH_SECRET`: Random string for JWT encryption.
- `NEXTAUTH_URL`: Canonical URL (e.g., `https://control.suras.org`).

```