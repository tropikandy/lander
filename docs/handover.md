# Server Handover: Max-ARM-Server (2026)

## 1. System Environment
- **Provider:** Oracle Cloud Infrastructure (OCI)
- **Architecture:** ARM64 (Ampere A1)
- **OS:** Ubuntu 
- **Networking:** Custom `ai-ecosystem` Docker network (External). Ports 80, 443, 3000-3005, 5001, 8080-8082, 9191, and 34400 opened via `iptables`.

## 2. Core Infrastructure (Managed via Dockge)
- **Dockge (Port 5001):** Primary stack manager. Stacks located in `/opt/stacks`.
- **Gitea (Port 3005):** Self-hosted Git for AI code. Database: SQLite3. SSH Port: 2222.
- **Homepage:** Dashboard at `suras.org`. Custom CSS applied for black text on high-contrast background.
- **Vaultwarden:** Password and secret management (ready for Cloudflare Tunnel).

## 3. Media & Automation
- **Dispatcharr (Port 9191):** IPTV management and M3U filtering.
- **Activepieces:** AI automation workflows.
- **Qdrant:** Vector database for AI memory.

## 4. Known Constraints & Fixes
- **Binary Architecture:** Always use `platform: linux/arm64` in Compose if `exec format error` occurs.
- **Permissions:** OCI images often require `PUID=1000` and `PGID=1000`. 
- **Firewall:** OCI requires both `iptables` rules and Cloud Console Ingress rules.
- **Threadfin:** Currently decommissioned due to ARM binary instability (Exit 255).