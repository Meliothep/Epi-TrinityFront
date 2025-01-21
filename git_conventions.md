## Commit Convention

**Conventional Commits** is a simple yet powerful convention for writing commit messages. It provides a clear structure for your commit history, making it easier to understand and automate. Here’s a quick overview to help you get started:

### Commit Message Format

A commit message should consist of a **header**, a **body**, and a **footer**. The header is mandatory and has a specific format, while the body and footer are optional.

**Header:**

```
<type>(<scope>): <subject>

```

- **type**: Describes the kind of change made. Common types include:
    - **feat**: A new feature
    - **fix**: A bug fix
    - **docs**: Documentation only changes
    - **style**: Changes that do not affect the meaning of the code (e.g., white-space, formatting)
    - **refactor**: A code change that neither fixes a bug nor adds a feature
    - **perf**: A code change that improves performance
    - **test**: Adding missing tests or correcting existing tests
    - **build**: Changes that affect the build system or external dependencies
    - **ci**: Changes to our CI configuration files and scripts
    - **chore**: Other changes that don't modify src or test files
    - **revert**: Reverts a previous commit
- **scope**: An optional part that provides context about the area of the codebase affected (e.g., module or filename).
- **subject**: A brief description of the change (max 72 characters).

**Body:**

- Provides additional contextual information about the commit. Use the imperative, present tense: "change" not "changed" nor "changes".

**Footer:**

- Contains any information about breaking changes and references to GitHub issues that the commit closes.

### Examples

1. **Feature Commit:**
    
    ```
    feat(authentication): add OAuth2 login support
    
    Added support for OAuth2 login to allow users to sign in with their Google accounts. This feature includes setting up the necessary routes, controllers, and views.
    ```
    
2. **Bug Fix Commit:**
    
    ```
    fix(api): correct user data serialization issue
    
    Fixed the issue where user data was not being correctly serialized in the API responses. The user model's serialization method has been updated to include the necessary fields
    ```
    
3. **Documentation Commit:**
    
    ```
    docs(readme): update setup instructions
    
    Updated the README file with new setup instructions for Docker and Docker Compose. Added sections on installing dependencies and running the application.
    ```
    
4. **Refactor Commit:**
    
    ```
    refactor(user-service): simplify user retrieval logic
    
    Refactored the user retrieval logic in the UserService to make the code simpler and more readable. Removed unnecessary conditional statements.
    ```
    

### Benefits

- **Consistency**: Provides a uniform way of writing commit messages.
- **Automation**: Facilitates the automation of the release process and changelog generation.
- **Clarity**: Makes it easier to understand the history of the project.

By following the Conventional Commits specification, our commit history will be more structured and meaningful, which helps in maintaining the project and collaborating efficiently.

## Branch Convention

### Conventions de Nommage des Branches Git

Pour maintenir une organisation claire et cohérente des branches dans notre projet Git, nous allons adopter une convention de nommage spécifique. Voici les conventions que nous suivrons :

### Types de Branches

1. **Main Branch**
    - **Nom**: `main`
    - **Usage**: Contient le code de production stable.
2. **Dev Branch**
    - **Nom**: `dev`
    - ***Usage**: Branche d'intégration pour le développement. Toutes les nouvelles* fonctionnalités doivent être fusionnées ici avant d'être fusionnées dans `main`.
3. **Feature Branches**
    - **Nom**: `feature/<description>`
    - **Usage**: Branches utilisées pour développer des nouvelles fonctionnalités. Créées à partir de `dev` et fusionnées dans `dev` une fois terminées.
    - **Exemple**: `feature/user-authentication`
4. **Bugfix Branches**
    - **Nom**: `bugfix/<description>`
    - **Usage**: Branches utilisées pour corriger des bugs non critiques trouvés dans `develop`. Créées à partir de `dev` et fusionnées dans `dev` une fois corrigées.
    - **Exemple**: `bugfix/fix-login-error`
5. **Hotfix Branches**
    - **Nom**: `hotfix/<description>`
    - **Usage**: Branches utilisées pour corriger des bugs critiques trouvés dans `main`. Créées à partir de `main` et fusionnées dans `main` et `dev` une fois corrigées.
    - **Exemple**: `hotfix/security-patch`
6. **Release Branches**
    - **Nom**: `release/<version>`
    - **Usage**: Branches utilisées pour préparer une nouvelle version de production. Créées à partir de `dev` et fusionnées dans `main` et `dev` une fois prêtes.
    - **Exemple**: `release/1.0.0`
7. **Chore Branches**
    - **Nom**: `chore/<description>`
    - **Usage**: Branches utilisées pour des tâches de maintenance ou d'amélioration qui ne sont pas directement liées à une fonctionnalité ou un bug.
    - **Exemple**: `chore/update-dependencies`

### Exemples de Nommage

- **Nouvelle fonctionnalité**: `feature/add-user-profile`
- **Correction de bug**: `bugfix/fix-navbar`
- **Correction urgente**: `hotfix/update-ssl-certificates`
- **Préparation de version**: `release/2.1.0`
- **Tâche de maintenance**: `chore/cleanup-code`
