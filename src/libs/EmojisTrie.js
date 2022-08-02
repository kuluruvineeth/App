import emojis from '../../assets/emojis';
import TrieNode from './EmojiTrieNode';

/** Class representing a Trie. */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
    * Add an emoji into the Trie
    * @param {String} input
    * @param {String} code
    * @param {TrieNode} node
    * @return {Object}
    */
    add(input, code, node = this.root) {
        if (input.length === 0) {
            node.setEnd();
            node.setCode(code);
            return;
        } if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new TrieNode());
            return this.add(input.substr(1), code, node.keys.get(input[0]));
        }
        return this.add(input.substr(1), code, node.keys.get(input[0]));
    }

    /**
    * Check if the emoji is exist in the Trie.
    * @param {String} emoji
    * @return {Object}
    */
    isEmoji(emoji) {
        let node = this.root;
        while (emoji.length > 1) {
            if (!node.keys.has(emoji[0])) {
                // return false;
                return {found: false};
            }
            node = node.keys.get(emoji[0]);
            // eslint-disable-next-line no-param-reassign
            emoji = emoji.substr(1);
        }
        const found = !!((node.keys.has(emoji) && node.keys.get(emoji).isEnd()));
        return {found, code: node.keys.get(emoji).getCode()};
    }
}

// Create a Trie object
const emojisTrie = new Trie();

// Inserting all emojis into the Trie object
for (let i = 0; i < emojis.length; i++) {
    if (emojis[i].name) {
        emojisTrie.add(emojis[i].name, emojis[i].code);
    }
}

export default emojisTrie;