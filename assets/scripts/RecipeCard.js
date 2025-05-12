// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)
		// A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
		let shadowEL = this.attachShadow({mode:'open'});
		// A2. TODO - Create an <article> element - This will hold our markup once our data is set
		let articleEl = document.createElement('article');
		// A3. TODO - Create a style element - This will hold all of the styles for the Web Component
		let styleEl = document.createElement('style');
		// A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made (copy everything INSIDE the <style> tag>)
		const cardStyles = document.querySelectorAll('style');
		for (let i = 0; i < cardStyles.length; i++) {
			if (cardStyles[i].innerHTML) {
				styleEl.innerHTML += cardStyles[i].innerHTML;
			}
		}
		// A5. TODO - Append the <style> and <article> elements to the Shadow DOM
		shadowEL.appendChild(styleEl);
		shadowEL.appendChild(articleEl);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		// A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
		const articleEl = this.shadowRoot.querySelector('article');
		// A7. TODO - Set the contents of the <article> with the <article> template given in
		//           cardTemplate.html and the data passed in (You should only have one <article>,
		//           do not nest an <article> inside another <article>). You should use template
		//           literals (template strings) and element.innerHTML for this.
		// 			 Do NOT include the <article> tags within the innerHTML of the element you create.
		//           Remember to replace all the placeholders in the template with the data passed in.
		//           i.e. imgSrc, titleLnk, etc

		//sets the img element
		let imgUrl;
		if (this.hasAttribute("img")) {
		imgUrl = this.getAttribute("img");
		} else {
		imgUrl = data.imgSrc;
		}
		const img = document.createElement('img');
		img.src = imgUrl;
		img.alt = data.imgAlt;

		//sets the title element
		const titleEl = document.createElement('p');
		titleEl.className = 'title';
		const titleLink = document.createElement('a');
		titleLink.setAttribute('href', data.titleLink);
		titleLink.innerHTML = data.titleTxt;
		titleEl.appendChild(titleLink);

		//sets the organization element
		const orgEl = document.createElement('p');
		orgEl.className = 'organization';
		orgEl.innerHTML = data.organization;

		//sets the rating element
		const ratingEl = document.createElement('div');
		ratingEl.className = 'rating';
		const rateNum = document.createElement('span');
		rateNum.innerHTML = data.rating;
		const rateImg = document.createElement('img');
		rateImg.src = `/assets/images/icons/${data.rating}-star.svg`;
		rateImg.alt = `${data.rating} stars`;
		const numRate = document.createElement('span');
		numRate.innerHTML = data.numRatings;
		ratingEl.appendChild(rateNum);
		ratingEl.appendChild(rateImg);
		ratingEl.appendChild(numRate);

		//creates the time element
		const timeEl = document.createElement('time');
		timeEl.innerHTML = data.lengthTime;

		//creates the ingredients element
		const ingredEl = document.createElement('p');
		ingredEl.className = 'ingredients';
		ingredEl.innerHTML = data.ingredients;

		//attatches all elements to the article
		articleEl.appendChild(img);
		articleEl.appendChild(titleEl);
		articleEl.appendChild(orgEl);
		articleEl.appendChild(ratingEl);
		articleEl.appendChild(timeEl);
		articleEl.appendChild(ingredEl);
	}
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard);