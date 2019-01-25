// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
const iframeStyle = {
  width: '100%',
  height: '700px',
  border: '0',
  borderRadius: '4px',
  overflow: 'hidden',
}

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);
const reducedIframeStyle = {...iframeStyle,  margin: "50px 0 0 0",  height: '500px'}

const tgisg2 = { fontWeight:'bold',textAlign:'left'}
const td = {fontFamily:'Arial', fontSize:'14px', padding:'10px 5px'}
const th = {...td, fontWeight: 'normal'}
const tgjgo1 = {textAlign: 'center', verticalAlign: 'top'}

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >


        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Clean Code
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            let's be nice
          </Text>
        </Slide>


        <Slide transition={['fade']} bgColor="tertiary">
          <iframe src="https://codesandbox.io/embed/7k3r9qm5l6?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={iframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>


        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <img alt="" src='https://raw.githubusercontent.com/AmandaOliver/clean-code/master/clean-code/src/images/image1.jpg'/>
        </Slide>


        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Leave the campground cleaner than you found it.</Quote>
            <Cite>Boy Scouts of America Rule</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['fade']} bgColor="white" textColor="tertiary">
          <Heading size={2} fit caps lineHeight={1} textColor="tertiary">
            Naming is hard!
          </Heading>
          <List margin="50px 0 0" textColor="secondary" size={2} fit bold>
            <ListItem  margin="50px 0 0">Why does it exists? what it does? how it is used?</ListItem>
            <ListItem  margin="50px 0 0">Pick one word per abstract concept and stick to it.</ListItem>
            <ListItem  margin="50px 0 0">Avoid using same word for two purposes, categorise with naming.</ListItem>
            <ListItem  margin="50px 0 0">The shorter, the better.</ListItem>
          </List>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="tertiary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
            Principle of Least [ Astonishment | WTFs ]
          </Heading>
          <BlockQuote><Quote>Any function should implement the behaviours that another programmer could reasonably expect.</Quote></BlockQuote>
        </Slide>

        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
           Comment = failure on naming
          </Heading>
          <iframe src="https://codesandbox.io/embed/nvrl0ljmp?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={reducedIframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="tertiary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
           Be Small, Compose!
          </Heading>
        </Slide>

        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={4} fit caps lineHeight={1} textColor="tertiary">
           Small functions on one level of abstraction
          </Heading>
          <iframe src="https://codesandbox.io/embed/nrwv5wmqxl?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={reducedIframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="tertiary" textColor="tertiary">
          <Heading size={4} fit caps lineHeight={1} textColor="primary">
            Do just one thing!!
          </Heading>
          <iframe src="https://codesandbox.io/embed/vq01vkr8l3?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={reducedIframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="tertiary">
          <Heading size={4} fit caps lineHeight={1} textColor="primary">
            Parameters, the fewer the better.
          </Heading>
          <Text textColor="tertiary"><table styles={{margin: 'auto'}}>
            <tr>
              <th styles={tgisg2}># parameters--</th>
              <th styles={tgisg2}># test cases--</th>
              <th styles={tgisg2}>cases</th>
            </tr>
            <tr>
              <td styles={tgjgo1}>0</td>
              <td styles={tgjgo1}>1</td>
              <td styles={tgjgo1}>f()</td>
            </tr>
            <tr>
              <td styles={tgjgo1}>1</td>
              <td styles={tgjgo1}>2</td>
              <td styles={tgjgo1}>f(0)<br/>f(1)</td>
            </tr>
            <tr>
              <td styles={tgjgo1}>2</td>
              <td styles={tgjgo1}>4</td>
              <td styles={tgjgo1}>f(0, 0) <br/>f(0,1)<br/>f(1,0)<br/>f(1,1)</td>
            </tr>
            <tr>
              <td styles={tgjgo1}>3</td>
              <td styles={tgjgo1}>8</td>
              <td styles={tgjgo1}>f(0,0,0)<br/>f(0,0,1)<br/>f(0,1,0)<br/>f(0,1,1)<br/>...</td>
            </tr>
          </table>
          </Text>
        </Slide>

        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <iframe src="https://codesandbox.io/embed/jnnro3n8v3?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={iframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="tertiary" textColor="tertiary">
          <Heading size={4} fit caps lineHeight={1} textColor="primary">
            Prefer Pure Functions
          </Heading>
          <iframe src="https://codesandbox.io/embed/k04yxl7l67?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={reducedIframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="tertiary">
          <Heading size={4} fit caps lineHeight={1} textColor="primary">
            Prefer Async/Await
          </Heading>
          <iframe src="https://codesandbox.io/embed/rjmzx419op?autoresize=1&hidenavigation=1&module=%2Fsrc%2Findex.js&view=editor" style={reducedIframeStyle} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Heading size={4} fit caps lineHeight={1} textColor="tertiary">
            Tests
          </Heading>
          <Text margin="10px 0 0" textColor="primary" size={1} fit bold>
            Without tests there is no clean code
          </Text>
        </Slide>

        <Slide transition={['fade']} bgColor="tertiary" textColor="primary">
          <Heading size={4} fit caps lineHeight={1} textColor="primary">
            F.I.R.S.T
          </Heading>
          <List margin="50px 0 0" textColor="secondary" size={2} fit bold>
            <ListItem  margin="50px 0 0">Fast</ListItem>
            <ListItem  margin="50px 0 0">Independent</ListItem>
            <ListItem  margin="50px 0 0">Repeatable</ListItem>
            <ListItem  margin="50px 0 0">Self Validating</ListItem>
            <ListItem  margin="50px 0 0">Timely</ListItem>
          </List>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Heading size={4} fit caps lineHeight={1} textColor="tertiary">
            Maintain the format/organization of the files.
          </Heading>
        </Slide>

        <Slide transition={['fade']} bgColor="tertiary" textColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Environment
          </Heading>
          <List margin="50px 0 0" textColor="primary" size={2} fit bold>
            <ListItem  margin="50px 0 0">start</ListItem>
            <ListItem  margin="50px 0 0">test</ListItem>
            <ListItem  margin="50px 0 0">build</ListItem>
          </List>
        </Slide>

      </Deck>
    );
  }
}
