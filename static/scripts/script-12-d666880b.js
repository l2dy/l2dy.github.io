
      window.goatcounter = { no_onload: true };

      const endpoint = "https://" + "idr" + "." + "goatcounter.com" + "/count";
      // Both routers emit an initial nav. Register before loading count.js so
      // cached scripts cannot count it twice, and slow scripts cannot miss it.
      let goatcounterLoaded = false;
      let pendingPageviews = [];
      document.addEventListener('nav', () => {
        const pageview = { path: location.pathname, title: document.title };
        if (goatcounterLoaded) {
          goatcounter.count(pageview);
        } else {
          pendingPageviews.push(pageview);
        }
      });

      const goatcounterScript = document.createElement('script');
      goatcounterScript.src = "https://gc.zgo.at/count.js";
      goatcounterScript.defer = true;
      goatcounterScript.setAttribute('data-goatcounter', endpoint);
      goatcounterScript.onload = () => {
        window.goatcounter.endpoint = endpoint;
        goatcounterLoaded = true;
        pendingPageviews.forEach((pageview) => goatcounter.count(pageview));
        pendingPageviews = [];
      };

      document.head.appendChild(goatcounterScript);
    