import { dashboardConfig } from './config.js';

const filterRoot = document.querySelector('#filter-groups');
const progressRoot = document.querySelector('#progress-list');
const resultCount = document.querySelector('#result-count');
const clearButton = document.querySelector('#clear-filters');
const selectedOptions = new Map(dashboardConfig.filters.map(({ id }) => [id, new Set()]));

function renderFilters() {
  filterRoot.innerHTML = dashboardConfig.filters.map((filter) => `
    <fieldset class="filter-group">
      <legend class="filter-label">${filter.label}</legend>
      <div class="filter-options">
        ${filter.options.map((option) => `
          <label class="filter-option">
            <input type="checkbox" value="${option}" data-filter="${filter.id}" />
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');
}

function matchesFilters(scenario) {
  return dashboardConfig.filters.every(({ id }) => {
    const selected = selectedOptions.get(id);
    return selected.size === 0 || selected.has(scenario.conditions[id]);
  });
}

function renderScenarios() {
  const visibleScenarios = dashboardConfig.scenarios.filter(matchesFilters);
  resultCount.textContent = `${visibleScenarios.length} ${visibleScenarios.length === 1 ? 'scenario' : 'scenarios'}`;

  if (visibleScenarios.length === 0) {
    progressRoot.innerHTML = `
      <div class="empty-state">
        <span class="empty-mark" aria-hidden="true">⌁</span>
        <h3>No progress on this perch</h3>
        <p>Try another combination, or clear a filter to see more.</p>
      </div>
    `;
    return;
  }

  progressRoot.innerHTML = visibleScenarios.map((scenario) => {
    const tags = dashboardConfig.filters.map(({ id }) => scenario.conditions[id]);
    return `
      <article class="progress-card">
        <div class="card-heading">
          <div>
            <h3 class="card-title">${scenario.title}</h3>
            <p class="card-note">${scenario.note}</p>
          </div>
          <span class="percent">${scenario.progress}%</span>
        </div>
        <div
          class="progress-track"
          role="progressbar"
          aria-label="${scenario.title} progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="${scenario.progress}"
        >
          <div class="progress-fill" style="width: ${scenario.progress}%"></div>
        </div>
        <div class="card-tags">${tags.map((tag) => `<span class="card-tag">${tag}</span>`).join('')}</div>
      </article>
    `;
  }).join('');
}

filterRoot.addEventListener('change', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') return;

  const selected = selectedOptions.get(input.dataset.filter);
  if (input.checked) selected.add(input.value);
  else selected.delete(input.value);
  renderScenarios();
});

clearButton.addEventListener('click', () => {
  selectedOptions.forEach((selected) => selected.clear());
  filterRoot.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.checked = false; });
  renderScenarios();
});

renderFilters();
renderScenarios();
