<template>
  <div class="scngfs">
    <div class="head">
      <a href="/">
      <img class="appicon" src="@/assets/appicon.png"/>
      </a>
      <h2>Appeal to Jerry</h2>
    </div>
    <div class="contact">
      <span class="right">&copy;Scenegifs</span>
      <span class="left"><a href="mailto:info@scenegifs.com">info@scenegifs.com</a></span>
    </div>
    <div class="results">
      <p>
      Mr. Seinfeld, I have tried to get in contact with your representatives through various avenues for over a year now to no avail. I hope this letter finds you and does not find you too vexed.
      </p>
      <p>
      One night a couple of years ago, I was watching an episode of Seinfeld before bed, an episode I must have seen a million times, like all of them. And whenever I watch your show the relatability of it has me wanting to send lines and quotes from the show to just about everyone. Fingers cramping as I typed out yet another hilarious scene to share with a friend I thought to myself, “Why all this typing? Why can’t I just send her the scene I’m thinking of, with facial expressions and everything?”. The idea for Scenegifs was born and a few weeks later the solution was ready.
      </p>
      <p>
      The solution can handle just about any video material and output just about any format, but I wanted to launch with the material that gave me the idea. That was the itch I was trying to scratch and I knew there was an army of Seinfeld fans waiting to get their hands on this.
      </p>
      <p>
      From what I understand, the sharing of GIF images made from copyrighted material falls under “fair use”. These are individuals, making short, low quality excerpts of the original material for personal use in a way that can not be said to harm the sales of the original material. Scenegifs is a tool that facilitates fans in making such work, but does so by providing limited access to a downgraded version of the source material. In many ways Scenegifs does not provide access to any material that doesn’t already exist publically in different forms, but at the same time provides a much more accurate way to find and generate exactly what the fan is looking for.
      </p>
      <p>
      So far as I know, nothing like this has been contested before so rather than tread on anyone’s toes I set about trying to find out how to talk to the content owners to see if an arrangement could be reached. A year later, after a lot of scratching my head, a few emails and talking to quite a few people I still hadn’t talked to a single person of relevance and was no closer to getting this tool to other fans.
      </p>
      <p>
      Therefore, in the end, I just wanted it to be seen.
      </p>
      <p>
        <a href="https://www.reddit.com/r/seinfeldgifs/comments/basecq/i_have_created_an_online_tool_for_searching/">
          The fans love it
        </a>
      </p>
      <p>
      Can we (or your representatives) talk?
      </P>
      <p>
      Ulfur
      </p>
      <p class="bottom">
        <img src="https://scngfs.xyz/seinfeld40900640068.gif">
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Letter',
  metaInfo: {
    title: 'Dear Jerry',
    titleTemplate: '%s - Scenegifs'
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
    margin: 8px 0px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .contact {
      font-size: 10px;
      text-align: center;
      height: 16px;

      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: solid 1px #f1f1f1;
  }

  .loader, .empty { text-align: center; }
  .left { float: left; }
  .right { float: right; }
  .search-field {
    width: 100%;
    border: solid 1px lightgray;
    padding: 8px;
    font-size: 16px;
    border-radius: 2px;
    margin: 8px 0px;
    -webkit-appearance: none;
  }

  .head {
    position: relative;
    padding-left: 68px;
    padding-top: 6px;
    height: 64px;
  }
  .appicon {
    width: 64px;
    position: absolute;
    top: 0px; left: 0px;
  }

  .more-btn {
    border: solid 1px #f1f1f1;
    padding: 8px;
    margin: 16px auto;
    display: block;
    width: 128px;
    text-align: center;
  }
  .bottom {
    text-align:center;
    border-top: solid 1px #f1f1f1;
    margin-top: 16px;
    margin-bottom: 64px;
    padding-top: 16px;
  }
</style>
