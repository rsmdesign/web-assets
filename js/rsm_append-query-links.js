const data = {
   markets: [
      "Mixed-Use Design",
      "Hospitality Signage Design",
      "Workplace Design",
      "Cultural Design",
      "Retail Environments & Graphic Design",
      "Sports & Entertainment",
      "Food & Beverage",
      "Park Wayfinding & Signage",
      "Civic Design",
      "Education Design",
      "Residential Community Signage",
      "Transit Signage Design",
      "Healthcare Signage Design",
      "International Design",
      "Waterfront Wayfinding Design",
      "Streetscape Design",
      "Parking Garage Design",
      "Multifamily Design",
   ],
   services: [
      "Environmental Graphic Design",
      "Branding & Logo Design",
      "Wayfinding Signage Design",
      "Placemaking Design",
      "Public Art & Murals",
      "Donor Recognition Signage Design",
      "Master Sign Programs",
      "Digital Signage Integration",
      "Exhibit Wayfinding Design",
      "Architectural Graphic Design",
      "Experiential Graphic Design",
      "Criteria & Guidelines",
      "Project Visioning",
      "Analysis & Strategy",
      "Graphic Architecture",
      "Experiential Graphic Design",
      "Architectural Graphic Design",
   ],
   offices: ["San Clemente, California", "Dallas, Texas", "Los Angeles, California", "Boulder, Colorado"],
   regions: [
      "China, East Asia",
      "San Diego, CA",
      "Nashville, Tennessee",
      "Florida Signage & Wayfinding Design",
      "United Arab Emirates (UAE)",
      "Salt Lake City, Utah",
      "Charlotte, NC",
      "South America",
      "Central America",
      "Saudi Arabia",
      "Seattle, WA",
      "Oregon",
      "Phoenix, AZ",
      "Europe",
      "Southern California",
      "Hawaii",
      "San Francisco",
      "Washington, D.C."
   ],
   rsm: ["Women Owned Business"],
   news: [
      "Awards",
      "Press",
      "Education",
      "RSM Culture",
      "Project Updates"
   ],
}

const queryValues = {
   "markets": "m",
   "services": "s",
   "offices": "o",
   "regions": "r",
   "rsm": "e",
   "topics": "t"
}

// determine category to filter by using the URL, i.e. rsmdesign.com/<category>
const filterCategory = window.location.pathname.split("/")[1]

const appendQueryParam = (href, key, value) =>
   href + (href.includes("?") ? "&" : "?") + key + "=" + value

if (filterCategory === "work") {
   const linkState = {}
   const updateLinks = (key, value) => () => {
      if (!linkState[key]) {
         linkState[key] = new Set()
      }
      if (linkState[key].has(value)) {
         linkState[key].delete(value)
      } else {
         linkState[key].add(value)
      }

      document
         .querySelectorAll("div:not(.w-condition-invisible) > div.grid-item-container a")
         .forEach(link => {
            let href = link.getAttribute("href").split("?")[0]

            for (const key of Object.keys(linkState)) {
               if (linkState[key].size > 0) {  
                  href = appendQueryParam(href, key, [...linkState[key]].join())
               }
            }

            link.setAttribute("href", href)
         })
   }
   document
      .querySelectorAll(".work-filter-grid > div")
      .forEach(dropdown => {
         const key = queryValues[dropdown.querySelector("h2").textContent.toLowerCase()]
         dropdown.querySelectorAll("[role=listitem] > a").forEach((item, i) => {
            item.addEventListener("click", updateLinks(key, i))
         })
      })
} else if (filterCategory === "news") {
   const linkState = {}
   const updateLinks = (key, value) => () => {
      if (!linkState[key]) {
         linkState[key] = new Set()
      }
      if (linkState[key].has(value)) {
         linkState[key].delete(value)
      } else {
         linkState[key].add(value)
      }

      document
         .querySelectorAll("div:not(.w-condition-invisible) > div.news-post-preview a")
         .forEach(link => {
            let href = link.getAttribute("href").split("?")[0]

            for (const key of Object.keys(linkState)) {
               if (linkState[key].size > 0) {  
                  href = appendQueryParam(href, key, [...linkState[key]].join())
               }
            }

            link.setAttribute("href", href)
         })
   }
   document
      .querySelectorAll(".work-filter-grid > div")
      .forEach(dropdown => {
         const key = "t"
         dropdown.querySelectorAll("[role=listitem] > a").forEach((item, i) => {
            item.addEventListener("click", updateLinks(key, i))
         })
      })
} else if (data[filterCategory]) {
   // get an index number for the selected category
   const pageTitle = document.querySelector("h1").textContent
   const categoryValue = data[filterCategory].indexOf(pageTitle)

   // append query parameters to all visible grid links
   document
      .querySelectorAll(
         "div:not(.w-condition-invisible) > div.w-dyn-list div.landing-projects-list div.grid-item-container a"
      )
      .forEach(link => {
         const href = link.getAttribute("href")
         link.setAttribute("href", appendQueryParam(href, queryValues[filterCategory], categoryValue))
      })
} else {
   throw new Error("Filter category missing in data: " + filterCategory)
}
