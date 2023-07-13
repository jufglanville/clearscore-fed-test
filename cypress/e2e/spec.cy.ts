describe('Idea Board', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads with a title, sort dropdown and add button', () => {
    cy.get('h1').should('contain', 'Idea Board');
    cy.get('img[alt="add"]');
    cy.get('select').should('have.value', 'createdAtDesc');
  });

  it('Adds a new Idea when the add button is pushed', () => {
    cy.get('img[alt="add"]').click();
    cy.get('textarea[placeholder="Title"]');
  });

  it('Focuses on the Title when a new task is added', () => {
    cy.get('img[alt="add"]').click();
    cy.focused().should('have.attr', 'placeholder', 'Title');
  });

  it('Allows the user to add a Title and Description', () => {
    cy.get('img[alt="add"]').click();
    cy.get('textarea[placeholder="Title"]').type('Test Title');
    cy.get('textarea[placeholder="Description"]').type('Test Description');
  });

  it('Calculates the character count for the Description', () => {
    const description = 'Test Description';
    const CharacterCount = (140 - description.length).toString();

    cy.get('img[alt="add"]').click();
    cy.get('textarea[placeholder="Description"]').type(description);
    cy.get('span').should('contain', CharacterCount);
  });

  it('Displays the date and time the task weas created', () => {
    const date = new Date().toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    cy.get('img[alt="add"]').click();
    cy.get('textarea[placeholder="Description"]').click();
    cy.get('span').siblings().should('contain', date);
  });

  it('Allows the user to delete a task', () => {
    cy.get('img[alt="add"]').click();
    cy.get('textarea[placeholder="Title"]');

    cy.get('img[alt="delete"]').click();
    cy.get('textarea[placeholder="Title"]').should('not.exist');
  });

  it('Allows the user to add multiple tasks', () => {
    const tasks = [
      { title: 'Test Title', description: 'Test Description' },
      { title: 'Another Test Title', description: 'Another Test Description' },
      {
        title: 'Yet Another Test Title',
        description: 'Yet Another Test Description',
      },
      {
        title: 'One More Test Title',
        description: 'One More Test Description',
      },
    ];

    tasks.forEach(task => {
      cy.get('img[alt="add"]').click();
      cy.get('textarea[placeholder="Title"]').first().type(task.title);
      cy.get('textarea[placeholder="Description"]')
        .first()
        .type(task.description);
    });
  });

  it('Allows the user to sort the order of the tasks', () => {
    const tasks = [
      { title: 'Test Title', description: 'Test Description' },
      {
        title: 'Another Test Title',
        description: 'Another Test Description',
      },
      {
        title: 'Yet Another Test Title',
        description: 'Yet Another Test Description',
      },
      {
        title: 'One More Test Title',
        description: 'One More Test Description',
      },
    ];

    tasks.forEach(task => {
      cy.get('img[alt="add"]').click();
      cy.get('textarea[placeholder="Title"]').first().type(task.title);
      cy.get('textarea[placeholder="Description"]')
        .first()
        .type(task.description);
    });

    cy.get('select').select('createdAtAsc');
    cy.get('select').select('titleAsc');
    cy.get('select').select('titleDesc');
    cy.get('select').select('createdAtDesc');
  });
});
