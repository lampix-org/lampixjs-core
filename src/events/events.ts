interface EventListeners {
  [functionId: string]: Function;
}

interface Topics {
  [topic: string]: {
    listeners: EventListeners,
    queue: string[]
  };
}

/**
 * @internal
 */
function eventsFactory() {
  const topics: Topics = {};

  function subscribe(topic: string, listener: Function, context: any = listener) {
    // Create topic queue if new
    if (!Object.prototype.hasOwnProperty.call(topics, topic)) {
      topics[topic] = {
        listeners: {},
        queue: []
      };
    }

    // Generate ID for listener
    const id = (+new Date * Math.random()).toString(36).substring(0, 8);

    // Bind context to function
    const handler = listener.bind(context);

    topics[topic].listeners[id] = handler;
    topics[topic].queue.push(id);

    return function unsubscribe() {
      // Remove from listeners and queue
      delete topics[topic].listeners[id];
      topics[topic].queue.splice(topics[topic].queue.indexOf(id), 1);
    };
  }

  function publish(topicName: string, info?: any) {
    if (!Object.prototype.hasOwnProperty.call(topics, topicName)) {
      return;
    }

    const topic = topics[topicName];

    /**
     * Iterate over a copy of the queue to handle cases when
     * unsubscribe is called during the execution of publish
     *
     * Upon unsubscribing, the topic handler will be removed from
     * both the original queue and listeners objects.
     * When iteration reaches the removed handler ID inside the
     * copied queue, the check for the listener's existence in the original
     * listeners object ensures that iteration will pass without
     * doing anything.
     */
    const queue = [...topic.queue];

    queue.forEach((handlerId) => {
      if (!topic.listeners[handlerId]) {
        return;
      }

      setTimeout(() => {
        topic.listeners[handlerId](info);
      });
    });
  }

  return {
    subscribe,
    publish
  };
}

export default eventsFactory;
