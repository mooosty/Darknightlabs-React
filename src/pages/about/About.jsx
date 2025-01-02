import React, { useState } from 'react';
import './about.scss';
import { KarmaIcon } from "../../utils/SVGs/SVGs";
import darknightlabsIcon from "../../assets/darknightlabs.svg";

const About = () => {
  const [isKarmaExpanded, setIsKarmaExpanded] = useState(false);

  return (
    <div className="content_header_wrap">
      <div className="content_header">
        <div className="content_left">
          <h2>About</h2>
        </div>
      </div>
      <div className="content_body">
        <div className="about_grid">
          <div className="about_card">
            <div className="card_header">
              <h3>Karma Points</h3>
              <KarmaIcon style={{ width: '1.2em', height: '1.2em' }} />
            </div>
            <div className={`card_content ${isKarmaExpanded ? 'expanded' : ''}`}>
              <p>There are two ways to increase your Karma level in The Win-Win Society:</p>
              
              <ol>
                <li>
                  <strong>Invite high tier individuals.</strong> Founders, VC partners, Family offices, Influencial people, etc.
                  <p>You get <strong>100 Karma minimum</strong> everytime someone new is coming from you (after being vetted and accepted)</p>
                  {isKarmaExpanded && (
                    <>
                      <p>For the highest tier people, you will get bonuses (e.g. if you bring Elon Musk to The Win-Win Society, we'll give you more than 100 Karma Points)</p>
                      <p>Furthermore, if they invite people themselves, you get <strong>20%</strong> of the Karma they generated back to you.</p>
                      <p>And if their people invite more people, you then get <strong>10%</strong> of these in Karma. Therefore, there is an incentive to bring people with a rich network, as it will benefit you too.</p>
                    </>
                  )}
                </li>
                
                {isKarmaExpanded && (
                  <li>
                    <strong>Win, then pay what you want.</strong>
                    <p>The Win-Win Society doesn't charge any fees from your investments. No cut, no management fees, no carry, no nothing.</p>
                    <p>However, we give you the possibility, once you win with us, to give back — if you desire to do so. (hence "win, then pay what you want)</p>
                    <p>Say you put in 10k and it turns to 100k, you might feel like you wanna give 10%, 15%, 20% of that.</p>
                    <p>If you decide to give back, you will earn KARMA, which will give you priority access for next deals with limited supply.</p>
                    <p>Additionally, if you bring people in who end up giving back as well, you will get <strong>20%</strong> of their KARMA based on their contribution. And if they bring their own network in, you will get <strong>10%</strong> from the people they invite.</p>
                    <p>This makes it win-win for you as well to bring people in who will invest and give back.</p>
                  </li>
                )}
              </ol>

              {isKarmaExpanded && (
                <div className="section">
                  <h4>Why the "Win, then pay what you want" model?</h4>
                  <p>WWS is not a charity, rather a bet on the natural law of reciprocity that is inherent to human beings (especially those with a win-win mindset, the people who we are targeting).</p>
                  <p>It's also a testimony in our confidence in the fact that we know we can deliver great deals, we therefore give you the leeway to win first, then contribute back later - if you decide to do so -, making our incentives very aligned, as we're not making money off of you either way, just by taking a cut from any raise, no matter if it perform well or not.</p>
                  <p>Finally, we believe that it emphasizes our win-win frame in a very powerful way. As you contribute back based on your own initiative, we anticipate that to solidify an exceptional level of trust and goodwill, making it a truly healthy, win-win ecosystem.</p>
                </div>
              )}
            </div>
            <button className="read_more_btn" onClick={() => setIsKarmaExpanded(!isKarmaExpanded)}>
              {isKarmaExpanded ? 'read less' : 'read more'}
            </button>
          </div>

          <div className="about_card">
            <div className="card_header">
              <h3>$winwin</h3>
              <img src={darknightlabsIcon} alt="Darknight Labs" style={{ width: '1.5em', height: '1.5em' }} />
            </div>
            <div className="card_content">
              <p>No much has been revealed about $winwin yet.</p>
              <p>But your Karma and Loyalty levels might have an impact at some point.</p>
            </div>
          </div>

          <div className="about_card full_width">
            <div className="card_header">
              <h3>Loyalty Points</h3>
            </div>
            <div className="card_content">
              <p>Your Loyalty increases or decreases based on how long you hold WWS' exclusive deals.</p>
              <p>Loyalty, alongside with Karma, can give you access to exclusive and scarce deals in the future, working as priorization mechanism, complementing Karma.</p>
              <p>Conversely, low Loyalty can prevent you from joining certain deals.</p>
              <p>The most loyal WWS holders will also get access to additional exclusive perks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 