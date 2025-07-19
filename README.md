# Marmitify

## Como rodar localmente com Docker Compose

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/marmitify.git
   cd marmitify
   ```

2. **Suba todos os serviços:**
   ```sh
   docker-compose up
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)
   - Grafana: [http://localhost:3002](http://localhost:3002) (login: admin/admin)
   - Prometheus: [http://localhost:9090](http://localhost:9090)

---

## Como rodar localmente com Kubernetes (Minikube ou Kind)

### Usando Minikube

1. **Instale o [Minikube](https://minikube.sigs.k8s.io/docs/start/):**
2. **Inicie o cluster:**
   ```sh
   minikube start
   ```
3. **Aplique os manifestos:**
   ```sh
   kubectl apply -f k8s/
   ```
4. **Acesse os serviços:**
   ```sh
   minikube service marmitify-service
   minikube service grafana
   minikube service prometheus
   ```

### Usando Kind

1. **Instale o [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/):**
2. **Crie o cluster:**
   ```sh
   kind create cluster
   ```
3. **Aplique os manifestos:**
   ```sh
   kubectl apply -f k8s/
   ```
4. **Acesse os serviços usando port-forward:**
   ```sh
   kubectl port-forward svc/marmitify-service 3000:3000 3001:3001
   kubectl port-forward svc/grafana 3002:3000
   kubectl port-forward svc/prometheus 9090:9090
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)
   - Grafana: [http://localhost:3002](http://localhost:3002)
   - Prometheus: [http://localhost:9090](http://localhost:9090)

---

## CI/CD e Deploy em Cloud

- O projeto já possui pipeline CI/CD configurado no GitHub Actions:
  - Build e testes do frontend e backend
  - Build e push da imagem Docker para o Docker Hub
  - Criação de release automática
  - Job de deploy para GKE (Google Kubernetes Engine) já preparado (basta ativar quando quiser usar cloud)

- Os manifestos Kubernetes estão prontos na pasta [`k8s/`](k8s/).

---

## Próximos passos para deploy em cloud

1. Crie um cluster Kubernetes na cloud (GKE, DigitalOcean, Linode, etc)
2. Configure o acesso do `kubectl` para o cluster
3. Ative o job de deploy no GitHub Actions ou rode manualmente:
   ```sh
   kubectl apply -f k8s/
   ```

---

## Estrutura dos manifestos Kubernetes

- [`k8s/postgres.yaml`](k8s/postgres.yaml): Banco de dados PostgreSQL
- [`k8s/marmitify-app.yaml`](k8s/marmitify-app.yaml): Aplicação (frontend + backend)
- [`k8s/prometheus.yaml`](k8s/prometheus.yaml): Monitoramento Prometheus
- [`k8s/grafana.yaml`](k8s/grafana.yaml): Dashboard Grafana

## Funcionalidades Kubernetes

- **Ingress HTTP com DNS Gratuito:**  
  A aplicação é exposta via recurso Ingress, permitindo acesso externo pelo domínio [marmitify.duckdns.org](http://marmitify.duckdns.org) (configurável). O DNS gratuito DuckDNS é utilizado para facilitar o acesso ao cluster.

- **Probes de Saúde (Liveness, Readiness e Startup):**  
  O deployment da aplicação utiliza probes para monitorar e garantir a saúde dos pods:
  - **Liveness Probe:** Reinicia o pod automaticamente caso o backend trave.
  - **Readiness Probe:** Garante que o frontend só recebe tráfego quando está pronto.
  - **Startup Probe:** Dá tempo extra para o backend iniciar antes de ativar as outras probes.

- **Manifestos prontos para cloud:**  
  Todos os recursos (banco, aplicação, monitoramento, ingress) já estão definidos em YAML na pasta [`k8s/`](k8s/), facilitando o deploy em qualquer cluster Kubernetes.

---

## Exemplo de acesso via Ingress

Após configurar o Ingress e o DNS, acesse:
- Frontend: [http://marmitify.duckdns.org/](http://marmitify.duckdns.org/)
- Backend: [http://marmitify.duckdns.org/api](http://marmitify.duckdns.org/api)

---

## Observações

- Para testar o Ingress localmente, adicione o IP do Ingress Controller e o domínio no arquivo `hosts` do seu sistema.
- Para produção, basta apontar o DNS do DuckDNS para o IP público do Ingress Controller na cloud.

---