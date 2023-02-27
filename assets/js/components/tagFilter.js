const tagFilter =(tags)=>`<form class="filters">
        ${
            tags.map((tag)=>`<div class="select-group">
                <label class="check-group">
                  <input class="select-input" type="checkbox" id="${tag.id}" />
                  <span class="select-span" for="search"></span>
                </label>
                <p class="text-select">${tag.name}</p>
              </div>`).join('\n')
        }
    </form>
    ` 
export default tagFilter