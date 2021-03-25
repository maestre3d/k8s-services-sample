# :8ball: Kubernetes Microservices Sample

A tiny repository to demonstrate K8s capabilities using a microservices architectural style along with heterogeneous technology and event-driven architectures.

The **application** is meant to be a _user daily tasks planner_ like Microsoft's Todo.

## Requirements
- Kubernetes
    - Kubectl
- Go 1.1X
- Node 14.X
- Helm
- Docker & Docker Compose

## Services

### User

`User service` is a microservice written in Go _-also known as Golang-_ which exposes an HTTP web service REST API.
It **_handles a basic user workflow_** (sign up, get a user)

_Note: When a user signs up, it dispatches a domain event into the platform which is later consumed by any component within the system._

### Planner
`Planner service` is a microservice written in Javascript _-executed within NodeJS environment-_ which exposes an HTTP web service REST API.
It **_handles a basic user task planning workflow_** (get a user todo list, add/remove a task to a user todo list)

_Note: When a user signs up, the todo service will receive such message and will create a todo list for the current user automatically._
