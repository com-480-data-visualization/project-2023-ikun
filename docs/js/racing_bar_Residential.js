function draw_new_script(){

let ticker;
let smooth;
let playing = false;

// function for stop the animation
function stopAnimation(button_pressed){
  
  ticker.stop(); smooth.pause(); playing = false;
}

// function for start the racing chart
function racing_chart() {

let racing_svg = d3.select(".racing-chart-div").append("svg")
.attr("width", 960)
.attr("height", 600);

let tickDuration = 500;

let top_n = 12;
let height = 600;
let width = 960;

const margin = {
top: 15,
right: 10,
bottom: 5,
left: 5
};

let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);

// set starting year.month
let year = 2020.0215;


let currentName = "WHERE MY GIRLS AT? - 702";

// create audio element
smooth = document.createElement("audio");


let animPlaying = false;
let reachEnd = false;

// listen to toggle
const jstoggle = document.getElementById('js-toggle');
jstoggle.addEventListener('click', () => {
    if (animPlaying == false) {
        playAnimation("test");
        animPlaying = true;
    }
    else {
        animPlaying = false; 
        stopAnimation("test");
    }
});

/*
const jstoggle = document.getElementById('js-toggle');
jstoggle.addEventListener('click', () => {
  if (reachEnd == true && animPlaying == true) {
    // do nothing.
    // console.log("Reach the end");
    smooth.pause();
    animPlaying = false;
  }
  else if (reachEnd == true && animPlaying == false) {
    smooth.play();
    animPlaying = true;
  }
  else if (animPlaying == false) {
    playAnimation("test");
    animPlaying = true;
    // console.log("play anim");
    
  }
  else {
    animPlaying = false; 
    stopAnimation("test");
    // console.log("stop anim");
  }
});
*/









// read our main dataset
//d3.csv('./data/Parks2.csv').then(function() 
  
var data = data_Residential;

  data.forEach(d => {
    d.colour = d3.hsl(Math.random()*360,0.4,0.55)
  });

  let yearSlice = data.filter(d => d.year == year )
  .sort((a,b) => b.value - a.value)
  .slice(0, top_n);

  let top1 = data.filter(d => d.year == year )
  .sort((a,b) => b.value - a.value)
  .slice(0, 1);
  // console.log("top1",top1);

  yearSlice.forEach((d,i) => d.rank = i);

  let x = d3.scaleLinear()
.domain([0, 200/*d3.max(yearSlice, d => d.value)*/])
    .range([margin.left, width-margin.right-65]);

  let y = d3.scaleLinear()
    .domain([top_n,0])
    .range([height-margin.bottom, margin.top]);

  let xAxis = d3.axisTop()
    .scale(x)
    .ticks(width > 500 ? 5:2)
    .tickSize(-(height-margin.top-margin.bottom))
    .tickFormat(() => ""); 

  // aesthetics
  racing_svg.append('g')
  .attr('class', 'axis xAxis')
  .attr('transform', `translate(0, ${margin.top})`)
  .call(xAxis)
  .selectAll('.tick line')
  .classed('origin', d => d == 0);

  // show bar
  racing_svg.selectAll('rect.bar')
    .data(yearSlice, d => d.name)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', x(0)+1)
    .attr('width', d => x(d.value)-x(0)-1)
    .attr('y', d => y(d.rank)+10)
    .attr('height', y(1)-y(0)-barPadding)
    .style('fill', d => d.colour);

  // show name of artist from beginning
  racing_svg.selectAll('text.label')
    .data(yearSlice, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.value)+8)
    .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)-10)
    //.style('text-anchor', 'end')
    .style('font-size', '15px') 
    .html(d => d.name);

  // show value from beginning
  racing_svg.selectAll('text.valueLabel')
  .data(yearSlice, d => d.name)
  .enter()
  .append('text')
  .attr('class', 'valueLabel')
  .attr('x', d => x(d.value)+8)
  .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)+10)
  .style('font-size', '15px') 
  .text(d => d3.format(',.0f')(d.lastValue));

  // show year on the right bottom
  let yearText = racing_svg.append('text')
  .attr('class', 'yearText')
  .attr('x', width-margin.right-100)
  .attr('y', height-25)
  .style('text-anchor', 'end')
  .style("font", "25px times")
  //.style("fill", "#8f3204")
  .html(parseFloat(year).toFixed(2));















// start playing animation
function playAnimation(button_pressed){
  racing_svg.selectAll('*').remove();
  
  var data = data_Residential;
  //d3.csv('./data/Parks2.csv').thenfunction(data) 

  data.forEach(d => {

    d.colour = d3.hsl(Math.random()*360,0.4,0.55)
  });


  let yearSlice = data.filter(d => d.year == year )
  .sort((a,b) => b.value - a.value)
  .slice(0, top_n);

  let top1 = data.filter(d => d.year == year )
  .sort((a,b) => b.value - a.value)
  .slice(0, 1);

  yearSlice.forEach((d,i) => d.rank = i);

  let x = d3.scaleLinear()
    .domain([0, 200/*d3.max(yearSlice, d => d.value)*/])
    .range([margin.left, width-margin.right-65]);

  let y = d3.scaleLinear()
    .domain([top_n,0])
    .range([height-margin.bottom, margin.top]);

  let xAxis = d3.axisTop()
    .scale(x)
    .ticks(width > 500 ? 5:2)
    .tickSize(-(height-margin.top-margin.bottom))
    .tickFormat(() => ""); 

  // aesthetics
  racing_svg.append('g')
  .attr('class', 'axis xAxis')
  .attr('transform', `translate(0, ${margin.top})`)
  .call(xAxis)
  .selectAll('.tick line')
  .classed('origin', d => d == 0);

  // show bar
  racing_svg.selectAll('rect.bar')
    .data(yearSlice, d => d.name)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', x(0)+1)
    .attr('width', d => x(d.value)-x(0)-1)
    .attr('y', d => y(d.rank)+10)
    .attr('height', y(1)-y(0)-barPadding)
    .style('fill', d => d.colour);


  // show name of artist from beginning
  racing_svg.selectAll('text.label')
    .data(yearSlice, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.value)+8)
    .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)-10)
    //.style('text-anchor', 'end')
    .style('font-size', '15px') 
    .html(d => d.name);

  // show value from beginning
  racing_svg.selectAll('text.valueLabel')
  .data(yearSlice, d => d.name)
  .enter()
  .append('text')
  .attr('class', 'valueLabel')
  .attr('x', d => x(d.value)+8)
  .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)+10)
  .style('font-size', '15px') 
  .text(d => d3.format(',.0f')(d.lastValue));

  // show year on the right bottom
  let yearText = racing_svg.append('text')
  .attr('class', 'yearText')
  .attr('x', width-margin.right)
  .attr('y', height-25)
  .style('text-anchor', 'end')
  .style("font", "25px times")
  .style("fill", "#8f3204")
  .html(parseFloat(year).toFixed(2));

  ticker = d3.interval(e => {

    window.progressBar.incTick();

  yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
    .sort((a,b) => b.value - a.value)
    .slice(0,top_n);

  yearSlice.forEach((d,i) => d.rank = i);


  let top1 = data.filter(d => d.year == year )
  .sort((a,b) => b.value - a.value)
  .slice(0, 1);

  top1.forEach((d,i) => myname = d.name);
  
  if (myname == currentName && playing == false) {
    if (myname == "WHERE MY GIRLS AT? - 702") {
      smooth.src = "./src/data/music/Where.mp3";
    } else{
    smooth.src = "./src/data/music/"+ myname +".mp3";
  }
  console.log("smooth: ", smooth.src);
  smooth.play();
  playing = true;
  console.log("line 230", myname, currentName, playing);
}else if (myname != currentName && playing == true) {
  smooth.pause();

document.querySelectorAll('audio').forEach(el => el.pause());
  smooth.src = "./src/data/music/"+ myname +".mp3";
  smooth.play();
  currentName = myname;
};

x.domain([0, 200/*d3.max(yearSlice, d => d.value)*/]); 

  racing_svg.select('.xAxis')
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .call(xAxis);

  let bars = racing_svg.selectAll('.bar').data(yearSlice, d => d.name);

  bars
    .enter()
    .append('rect')
    .attr('class', d => `bar ${d.name.replace(/\s/g,'_')}`)
    .attr('x', x(0)+1)
    .attr( 'width', d => x(d.value)-x(0)-1)
    .attr('y', d => y(top_n+1)+5)
    .attr('height', y(1)-y(0)-barPadding)
    .style('fill', d => d.colour)
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => y(d.rank)+10);
      
  bars
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', d => x(d.value)-x(0)-1)
      .attr('y', d => y(d.rank)+10);
        
  bars
    .exit()
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', d => x(d.value)-x(0)-1)
      .attr('y', d => y(top_n+1)+5)
      .remove();

  let labels = racing_svg.selectAll('.label')
      .data(yearSlice, d => d.name);

  labels
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.value)+8)
    .attr('y', d => y(top_n+1)+5+((y(1)-y(0))/2)-10)
    //.style('text-anchor', 'end')
    .html(d => d.name)    
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)+1);
        

  labels
      .transition()
      .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value)+8)
        .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)-10);

  labels
      .exit()
      .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value)+8)
        .attr('y', d => y(top_n+1)-10)
        .remove();
    
  let valueLabels = racing_svg.selectAll('.valueLabel').data(yearSlice, d => d.name);

  valueLabels
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', d => x(d.value)+8)
      .attr('y', d => y(top_n+1)+10)
      .text(d => d3.format(',.0f')(d.lastValue))
      .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)+1);
        
  valueLabels
      .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value)+8)
        .attr('y', d => y(d.rank)+10+((y(1)-y(0))/2)+10)
        .tween("text", function(d) {
          let i = d3.interpolateRound(d.lastValue, d.value);
          return function(t) {
            this.textContent = d3.format(',')(i(t));
          };
        });


  valueLabels
    .exit()
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => x(d.value)+8)
      .attr('y', d => y(top_n+1)+10)
      .remove();

  yearText
  .style("font", "25px times")
  .style("fill", "#8f3204")
  .html(parseFloat(year).toFixed(2));

  

  if(year >= 2022.1015) {
    ticker.stop(); 
    console.log("Before calling timer");
window.progressBar.toTotal();

    reachEnd = true;
    
    
  }

  year = d3.format('')((+year) + 0.01);
  if ((year % 1).toFixed(2) == "0.13") {year = parseFloat((~~year + 1 + 0.0001).toFixed(4))};


  },tickDuration);

  
}
 
}

racing_chart();

};
