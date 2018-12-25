

public class Syn2 extends Thread{

	  public static void main(String[] args) throws InterruptedException {
	  final Object lock = new Object();
	  
	  Thread t1 = new Thread(new Runnable() {

	    @Override
	   public void run() {
	    for (int i = 0; i < 10; i++) {

	      synchronized (lock) {
	      try {
	    	  myDisplay("ab");
	       lock.wait();
	       lock.notify();
	      } catch (InterruptedException ex) {
	       ex.printStackTrace();
	      }
	     }
	    }
	   }
	  });

	   Thread t2 = new Thread(new Runnable() {

	    @Override
	   public void run() {
	    for (int i = 0; i < 10; i++) {
	     synchronized (lock) {
	      lock.notify();
	      try {
	    	  myDisplay("cd\n");
			  lock.wait();
	      } catch (InterruptedException ex) {
	       ex.printStackTrace();
	      }
	     }
	    }
	   }
	  });
	   
	  // starting the threads
	  t1.start();
	  t2.start();
	  // joining the threads
	  t1.join();
	  t2.join();

	  }
	  
	  public static void myDisplay(String msg) {
			Display.Display(msg);
	  }

}

