Vue.use(vSelectPage.default, {
    language: 'en'
});

var slider1 = new Vue({
    el: "#app",
    data() {
        var entries = [
            { id: 0, name: 'grocery_and_pharmacy', desc: 'grocery_and_pharmacy', file: 'racing_bar_Grocery.js' },
            { id: 1, name: 'parks', desc: 'Parks', file: 'racing_bar_Parks.js' },
            { id: 2, name: 'residential', desc: 'residential', file: 'racing_bar_Residential.js' },
            { id: 3, name: 'retail_and_recreation', desc: 'retail_and_recreation', file: 'racing_bar_Retail.js' },
            { id: 4, name: 'transit_stations', desc: 'transit_stations', file: 'racing_bar_Transit.js' },
            { id: 5, name: 'workplaces', desc: 'workplaces', file: 'racing_bar_Workplaces.js' }
        ];
        return {
            selectedItems: "",
            entries: entries,
            columns: [
                { title: 'id', data: 'id' },
                { title: 'name', data: 'name' },
                { title: 'desc', data: 'desc' },
            ]
        };
    },
    methods: {
        handleSelectionChange() {
            console.log(" handleSelectionChange ")
            console.log(this.selectedItems);

            // Find the entry with the selected id
            const selectedEntry = this.entries
                .find(entry => entry.id == this.selectedItems);
            // Use the file property of the selected entry

            const scriptToLoad = selectedEntry.file;

            let newScript = document.createElement("script");
            newScript.src = "js/" + scriptToLoad;
            document.head.appendChild(newScript);
            
            set_global_transit();
            window.progressBar.restart();
            d3.select(".racing-chart-div").selectAll("*").remove();
            draw_new_script();
        }
    }
});

window.progressBar = new Vue({
    el: "#time-bar",

    template: `
    <div :style="{height:'30px', width:tick+'px', backgroundColor:'#aaa', transition: 'all .5s linear'}">
    </div>
    `,

    data() {
        return {
            tick: 0,
            totalCount: 100,
        }
    },

    computed: {
        dtick(){
            return 960 / this.totalCount;
        }
    },

    methods: {
        restart(){
            this.tick = 0;
        },
        
        incTick(){
            this.tick += this.dtick;
        },

        toTotal(){
            this.tick = 960;
        }
    }
});